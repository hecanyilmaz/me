export interface Scene {
  id: string;
  photo_path: string;
  date: string;
  place: string;
}

export interface ScenesData {
  scenes: Scene[];
}

