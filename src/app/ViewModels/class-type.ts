export interface ClassType {
    'id': number;
    'name': string;
    'type': string;
    'class_id': number;
    'class_type_id': number;
    'classes': {
        'id': number,
        'name': string,
        'type': string
    };
}
