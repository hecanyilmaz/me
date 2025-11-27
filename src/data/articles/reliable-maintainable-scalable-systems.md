# Reliable, Scalable and Maintainable Systems

When do you really need to consider your system to be reliable, scalable and maintainable? When you kick off a new project, the first thing comes into mind is not achieving the goals. Probably, your priority will be adding more features to the product and attract more people to use it. If you managed to succeed at attracting people then you'll need to start to consider these concepts. Number of the members on your product team will increase, you will ship more features, your product will be used more than ever. 

---
Now, let's continue with reliability, scalability and maintainability.

### Reliability
A **fault** defined as one component of the system is no longer perform its spec, whereas a **failure** is when the system as a whole stops providing its service. 

A system which performs as intended even the faults occur, we call it **reliable**. There are many types of faults we can identify. Fortunately we are only supposed to tolerate some of them. We'd never know an explotion coming from a star won't destroy earth, therefore it is not one of our concerns.

Let's talk about our concerns in a system: **Hardware faults** are very common in data centers. Approximately a datacenter includes more than 10.000 hardwares and one hardware dies per day. Also, we expect power supply blackouts, a network cable can be unplugged unintentionally etc. To overcome hardware faults, we keep reduntant hardwares to replace them with the died ones. We keep more than one power supply units, diesel generators for backup power etc. **Software errors** are usually lie dormant for a long-time in a software. They are triggered when a unique set of conditions are met. There is no quick solution to the systematic faults in a software. Before those errors occur, we need to consider our assumptions carefully about the load, environment and integration with other systems. Also monitoring, measuring and analyzing the system behaviour is really important, you may prevent a software's bug to stop entire service you provide. **Humans** are known as unreliable in spite of they are the architects and operators of those systems. **Human errors** are leading cause of outages. The hardware faults played role as only 15-20% of outage causes.

### Scalability

**Scalability** is the term we use to describe a system's ability to cope with increase in **load**. Typically a system's behaviour with 10.000 concurrent users is not same with 100.000 concurrent users. To describe load we first need to analyze your system. You may consider data writes to a database as load and other one consider load as number of active users in an online game. It depends to your system. 

Now what will happen if the load in your system increases when your system itself is unchanged? What metrics of your system will be affected? Or how many resource you should upgrade to make  your metrics stable to cope with increase in load? To answer those question we need to describe performance.  Considering **performance** requires an answer to question: What do you need to measure while your load is increasing? You may measure throughput, response time or total time of a job etc. It depends to your system.

There are many approaches are being used today to cope with increase in load. And those approaches are developed by people who look out for performance of the system under set of conditions: scaling up or scaling out. Basically, scaling up is making your existing server more powerful and scaling out is adding more machines to your pool of resources. The complexity of scaling out often revolves around **data and state** (stateless application tiers and statful data tiers).


### Maintainability
We should design softwares where we can maintain them with minimum pain. A software which is easy to operate, understand and make a change is called as **maintainable**. To operate a software within scope of maintenance we shouldn't suffer. Also as the team changes/grows the new members of the team should understand the system itself without having pain. Making a change on a software itself also should be easy. There are many concepts in software development life cycle to achieve maintainable softwares. But this is not in our scope of this mini-article.

---
An application has to meet lots of functional requirements to provide a service. (what data should be stored/fetched/processed etc.) And also an application has to meet some nonfunctional requirements such as availability, maintainability, reliability, compatability etc. In this article we discussed the terms reliability, scalability and maintainability.