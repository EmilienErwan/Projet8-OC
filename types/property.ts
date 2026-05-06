export type Host = {
  id?: number;
  name?: string;
  picture?: string;
};

export type Property = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  cover?: string;
  pictures?: string[];
  equipments?: string[];
  tags?: string[];
  host?: Host;
  price?: number;
  price_per_night?: number;
};