export interface Schedule {
    // tslint:disable-next-line:quotemark
    "id": number;
    'name': string;
    'study_year': string;
    'semester': string;
    'class_id': number;
    'created_at': string;
    'updated_at': string;
    'class': {
        'id': number;
        'name': string;
    },
    'class_type_id': number;
    'schedule_days': [
        {
            'day': {
                'name': string;
                'rations': [
                    {
                        'subject': string;
                    },
                    {
                        'subject': string;
                    },
                    {
                        'subject': string;
                    },
                    {
                        'subject': string;
                    },
                    {
                        'subject': string;
                    }
                ]
            }
        }
    ]
}


