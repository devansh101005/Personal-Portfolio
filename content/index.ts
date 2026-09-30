// Barrel — import site content from one place: `@/content`.
export * from "./types";
export { profile } from "./profile";
export { education } from "./education";
export { stack } from "./stack";
export { experience } from "./experience";
export { publications, getPublicationForProject } from "./publications";
export {
  projects,
  productionProjects,
  experimentProjects,
  personalToolProjects,
  guidedProjects,
  getProject,
} from "./projects";
