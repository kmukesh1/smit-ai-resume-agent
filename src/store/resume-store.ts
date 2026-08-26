import { create } from "zustand";
import { emptyResume, STORAGE_KEY, type ResumeData } from "@/lib/resume-model";
import { SAMPLE_PROFILE } from "@/lib/sample-profile";
import { TRACKS, type TrackId } from "@/lib/tracks";

type Mode = "guided" | "paste";

type State = {
  data: ResumeData;
  mode: Mode;
  track: TrackId | null;
  paste: string;
  notice: string;
  setField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  setProject: (i: number, patch: Partial<ResumeData["projects"][0]>) => void;
  setExperience: (i: number, patch: Partial<ResumeData["experience"][0]>) => void;
  addProject: () => void;
  addExperience: () => void;
  setMode: (mode: Mode) => void;
  setPaste: (paste: string) => void;
  applyTrack: (id: TrackId) => void;
  loadSample: () => void;
  clearAll: () => void;
  merge: (patch: Partial<ResumeData>) => void;
  setNotice: (notice: string) => void;
  hydrate: () => void;
};

function persist(data: ResumeData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}

export const useResumeStore = create<State>((set, get) => ({
  data: emptyResume(),
  mode: "guided",
  track: null,
  paste: "",
  notice: "",
  setField: (key, value) => {
    const data = { ...get().data, [key]: value };
    persist(data);
    set({ data });
  },
  setProject: (i, patch) => {
    const projects = get().data.projects.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
    const data = { ...get().data, projects };
    persist(data);
    set({ data });
  },
  setExperience: (i, patch) => {
    const experience = get().data.experience.map((p, idx) =>
      idx === i ? { ...p, ...patch } : p,
    );
    const data = { ...get().data, experience };
    persist(data);
    set({ data });
  },
  addProject: () => {
    const data = {
      ...get().data,
      projects: [...get().data.projects, { title: "", tech: "", bullets: "", link: "" }],
    };
    persist(data);
    set({ data });
  },
  addExperience: () => {
    const data = {
      ...get().data,
      experience: [...get().data.experience, { role: "", org: "", dates: "", bullets: "" }],
    };
    persist(data);
    set({ data });
  },
  setMode: (mode) => set({ mode }),
  setPaste: (paste) => set({ paste }),
  applyTrack: (id) => {
    const track = TRACKS.find((t) => t.id === id);
    if (!track) return;
    const data = { ...get().data, ...track.patch };
    persist(data);
    set({ data, track: id });
  },
  loadSample: () => {
    persist(SAMPLE_PROFILE);
    set({ data: SAMPLE_PROFILE, track: "sde", notice: "Sample SMIT profile loaded." });
  },
  clearAll: () => {
    const data = emptyResume();
    persist(data);
    set({ data, track: null, paste: "", notice: "" });
  },
  merge: (patch) => {
    const data = { ...get().data, ...patch };
    persist(data);
    set({ data });
  },
  setNotice: (notice) => set({ notice }),
  hydrate: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ResumeData;
      if (parsed?.fullName !== undefined) set({ data: { ...emptyResume(), ...parsed } });
    } catch {
      /* ignore */
    }
  },
}));
