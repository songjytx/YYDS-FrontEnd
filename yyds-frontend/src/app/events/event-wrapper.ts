
export interface EventWrapper {
  [key: string]: Event[] | string[] | undefined;
  data: Event[];
  links: string[];
}
