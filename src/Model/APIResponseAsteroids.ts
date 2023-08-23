interface ApiResponse {
    links: {
        next: string;
        previous: string;
        self: string;
    };
    element_count: number;
    near_earth_objects: {
        [date: string]: NearEarthObject[];
    };
}
interface NearEarthObject {
    links: {
        self: string;
    };
    id: string;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: {
        kilometers: DiameterRange;
        meters: DiameterRange;
        miles: DiameterRange;
        feet: DiameterRange;
    };
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: CloseApproachData[];
    is_sentry_object: boolean;
}
interface DiameterRange {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}
interface CloseApproachData {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: Velocity;
    miss_distance: Distance;
    orbiting_body: string;
}
interface Velocity {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
}
interface Distance {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
}
