export interface Scene {
  photo_name: string;
  date: string;
  place: string;
}

export interface SceneWithPath extends Scene {
  photo_path: string;
}

export interface ScenesData {
  scenes: Scene[];
}

