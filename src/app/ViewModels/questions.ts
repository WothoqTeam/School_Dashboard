export interface Questions {
    'id': number;
    'question': string;
    'exam_id': number;
    'type': string;
    'answers': [
        {
            'id': number;
            'answer': string;
            'is_correct': string;
            'question_id': string;
            'created_at': string;
            'updated_at': string;
        }
    ]
}