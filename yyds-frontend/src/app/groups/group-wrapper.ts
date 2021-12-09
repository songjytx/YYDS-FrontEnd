
export interface GroupWrapper {
  [key: string]: Event[] | string[] | undefined;
  data: Event[];
  links: string[];
}
