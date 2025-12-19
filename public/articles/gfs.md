# GFS

### Introduction to GFS
The **Google File System (GFS)** is a scalable, distributed file system designed by Google to efficiently manage and store massive amounts of data across thousands of commodity servers in 2003. In their designing phase they considered traditional choices from distributed file systems. Also, their visions had changed to adopt their technological environment. Some of their observations: 
- Component failures occurs more than they expect. Therefore, those failures are the norm. The monitoring, detecting errors, tolerating faults should be must. 
- Processing huge files brings billions of small objects with it. Operating KB sized files together is unwieldy. As a result, the block sizes should be revisited.
- Most files are mutated by appending new data rather than overwriting existing ones. When the data is written it's mostly read sequentially.

### Assumptions they made
- The system consists of many cheap, unreliable components and must automatically recover from failures as a standard practice.
- GFS is optimized for millions of files, each typically 100 MB to multiple GBs in size.
- As common, applications read large contiguous ranges. They read small pieces at arbitrary offsets.
-  Most writes are large and append-only, with very few random small updates. Once written, the files are rarely modified.
- The system serves multiple clients, and must ensure that the atomic concurrent operations should be executed with minimal extra synchronization overhead.
- The primary goal is to sustain high bandwidth for large data processing jobs, not serving low response times for clients for many individual operations.

### Architecture of GFS

![GFS Architecture](gfs_images/gfs_architecture.png#80)

- A GFS cluster consists of a master node, multiple chunkservers and is accessed by multiple clients. 

- Files are splitted into fixed-size blocks called **chunks**. Each chunk's size is **64 MB**. Each chunk has it's immutable and globally unique 64-bit long identifier called **chunk handler**. Chunk handlers are assigned by the master at the time of creation. Each chunk is stored in multiple chunkservers by replication to gain redundancy.

- The clients communicate with the master and chunkservers to read or write data. Clients interact with the master for metadata operations, but all data-bearing communication goes directly to the chunkservers.


![GFS Master](gfs_images/gfs_master.png#80)


In the system, having single master helped them to make sophisticated placement and replication operations using global knowledge. Minimizing the master involvement in reads/writes are critical. Because making the master a bottleneck will have a negative effect on performance. Therefore, the client only gets interaction with the master is for getting metadata about the chunkservers involved in read/write operations. Once the information fetched and cached on client, the client only sends appropriate requests to the chunkservers. 

Metadata consists of those informations:
- the file and chunk namespaces
- the mappings from files to chunks
- the locations of each chunk's replicas

All metadata is kept in the master's memory. The first two types are also kept persistent by logging. **Operation logs** are stored in local disk of the master and also remote machines. The master doesn't hold any information about the locations of chunks' replicas. Instead it sends **HeartBeat** messages at master startup, and the time when a new chunkserver joined the cluster, or periodically. Operation logs are also give a timeline for concurrent operations in GFS. Since, those logs are critical we shouldn't inform clients until making the metadata changes persistent both locally and remotely.

![GFS Chunkserver](gfs_images/gfs_chunkserver.png#50)

**Chunkservers** are the distributed, resilient, stateless data warehouses of GFS, storing chunk files assigned by the master and serving data directly to clients under the master’s orchestration.

### Consistency model of GFS


![GFS Consistency](gfs_images/gfs_consistency.png#80)


The consistency guarantee for GFS is relaxed. It does not guarantee that all the replicas of a chunk are byte-wise identical. What it does guarantee is that every piece of data stored will be written at least once on each replica. This means that a replica may contain duplicates, and it is up to the application to deal with such anomalies.

A file region is *consistent* when all the clients will see the same data for it, regardless of which replica they read from. After a file data mutation, a region is *defined* if it is consistent and all the clients will see the effect of the mutation in its entirety. The data mutations here may be writes or record appends. A write occurs when data is written at a file offset specified by the application.

### Operation: Read

![GFS Read](gfs_images/gfs_read_architecture.png#80)

#### Read operation steps
1. By using fixed chunk size, the client translates the filename and byte offset specified by the application to chunk index within file.
2. The client sends a request including file name and chunk index to the master.
3. The master replies with corresponding chunk handle and locations of the replicas. And client caches this information for some amount of time.
4. The client sends a request to the chunkserver most likely the closest one. The request includes chunk handle and byte range within that chunk. (In fact,  in a single request to the chunkservers includes multiple chunk handles and byte ranges.)
5. Then corresponding chunk data is sent to client.

### Operation: Write

![GFS Write](gfs_images/gfs_write_architecture.png#80)

The **lease** mechanism is designed to minimize management overhead at the master. A lease has an initial timeout of 60 seconds. However, as long as the chunk is being mutated, the primary can request and typically receive extensions from the master indefinitely. These extension requests and grants are piggybacked on the HeartBeat messages regularly exchanged between the master and all chunkservers. The master may sometimes try to revoke a lease before it expires. Even if the master loses communication with a primary, it can safely grant a new lease to another replica after the old lease expires.

#### Write operation steps
1. The client asks master which chunkserver holds the current lease for the chunk and the locations of the other replicas that holds the chunk.
2. Master replies with the identiy of the primary and locations of the secondary replicas. Client caches this information for a period of time to prevent an overhead in master. Client sends another request to master if the chunkserver doesn't hold a lease or is unreachable.
3. Decoupling the data flow from control flow helps leveraging physical network topology. Client can start to send data to all replicas using any of the chunkservers (primary and secondaries) it can reach out. The data sent is stored in LRU buffer cache of the chunkservers.
4. Since all data is sent to all replicas, client sends write request to the primary. The primary assigns an serial order to execute write mutations consecutively. Then it applies mutations in the consecutive order. 
5. The primary forwards the write request to all replicas. The all replicas executes those mutations in the same order primary assigned.
6. All secondaries reply to primary indicating that they whether completed the execution successfully or not. 
7. The primary replies to the client whether all operations are succedded on all replicas or not. If one of the replicas has failed some how, the write operation itself considered as failed. It will attempt to execute the steps from 3 to 7 for several times to succeed.

### Operation: Record Append

![GFS Padding](gfs_images/gfs_padding.png#80)

GFS offers an atomic record append operation, that doesn't give an offset as **write operation** does. Concurrent write operations doesn't guarantee the serialzation, the data region may have data fragments from multipe clients. Therefore there is another operation called **record append**. High percentage of the operations on the system are made of **record appends**. Basically the synchronization between clients and the master or developing tackless locking mechanisms are left to GFS by using the record append operation instead of write operation.

#### Record append operation steps
1. The client asks master which chunk to write and also it's primary and secondaries's locations.
2. Master replies with the identiy of the primary and locations of the secondary replicas. Client caches this information for a period of time to prevent an overhead in master. Client sends another request to master if the chunkserver doesn't hold a lease or is unreachable.
3. Decoupling the data flow from control flow helps leveraging physical network topology. Client can start to send data to all replicas using any of the chunkservers (primary and secondaries) it can reach out. The data sent is stored in LRU buffer cache of the chunkservers.
4. Since all data is sent to all replicas, client sends record append request to the primary. The primary checks to see if appending the record to the current chunk cause the chunk to exceed the maximum size. If so, it pads the chunk to the maximum size and tells secondaries to the same.
5. The primary forwards the record append request to all replicas. The all replicas executes those mutations (including padding).
6. All secondaries reply to primary indicating that they whether completed the execution successfully or not. 
7. The primary replies to the client whether all operations are succedded on all replicas or not. If padding applied primary wants the client to retry the operation on the next chunk. If one of the replicas has failed some how, the record append operation itself considered as failed. It will attempt to execute the steps from 3 to 7 for several times to succeed.

### Operation: Snapshot

The snapshot operation makes a copy of a file or a directory tree (the “source”) almost instantaneously, while minimizing any interruptions of ongoing mutations. In GFS, standard write-on-copy technique is used to implement snapshot. 

#### Snapshot operation steps
1. The master recieves snapshot request on a file or a directory. And acquire a lock for the file or directory.
2. The master logs the operation to disk. It applies this log record to its in-memory state by duplicating the metadata for the source file or directory tree.
3. Created snapshot files point to the same chunks as the source files.
4. The first time client sends a write request to the master, master notices refernce count for chunk C is greater than one. It defers replying to client.
5. It picks another chunk C' on all replicas of this chunk C. By doing this, data is not transfered over the network, the copying process is done locally. 
6. Then master grants lease to the one of the replicas of chunk C', then write operation occurs without knowing internal changes of the system.


### Fault Tolerance
GFS achieves high availability through a combination of replication, rapid recovery, and minimal dependence on any single component.

**1. Chunk Replication**
- Every chunk of data is replicated, usually on three different chunkservers, often in different racks.
- If any chunkserver fails, the data can be served from other replicas immediately, ensuring uninterrupted access.

**2. Master Replication and Fast Recovery**
- The master’s metadata (file namespace, chunk locations, versions) is persistently logged and checkpointed.
- This metadata is replicated to remote machines (shadow machines).
- If the master fails, it can be restarted or rebuilt quickly from the last checkpoint and logs, minimizing downtime.

**3. Rapid Fault Detection and Recovery**
- Chunkservers regularly report to the master. If a failure is detected, the master can quickly re-replicate any lost chunks to maintain the desired number of replicas.


### Data Integrity
Checksumming is used by each chunkserver to detect the corruption of stored data.

A checksum algorithm takes a block of bytes as input and returns a single number that's a function of all the input bytes. When a chunkserver writes a chunk on its disk, it first computes the checksum of the new chunk, and saves the checksum on disk as well as the chunk. When a chunkserver reads a chunk from disk, it also reads the previously-saved checksum, re-computes a checksum from the chunk read from disk, and checks that the two checksums match.