import statesJson from '../../docs/states.json';

export interface StateEntry {
  state: string;
  districts: string[];
}

export type CountryData = StateEntry[];

export const LOCATION_DATA: Record<string, CountryData> = statesJson as unknown as Record<string, CountryData>;

export const COUNTRY_KEYS = Object.keys(LOCATION_DATA).sort();

export function getStates(country: string): StateEntry[] {
    return LOCATION_DATA[country] || [];
}
