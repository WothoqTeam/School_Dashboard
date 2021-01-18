export interface Classes {
    'id': number ;
    'teacher_id':number ;
    'subject_id': number ;
    'class_id': number ;
    'zoom_room_id':number ;
    'start_time': string;
    'end_time': string;
    'start_url': string;
    'join_url': string;
    'agenda': string;
    'duration': string;
    'teacher': {
        'id': number,
        'name': string;
    },
    'class': {
        'id': number;
        'name': string;
    },
    'subject': {
        'id': number,
        'name': string;
        'semester': string;
    }
}
