export interface Exams {
    'id': number,
    'name': string,
    'exam_timer': string,
    'number_of_attempts': number,
    'exam_validity': number,
    'class_id': number,
    'question_count':number,
    'questions': [
        {
            'id': number,
            'question': string,
            'exam_id': number,
            'created_at': string,
            'updated_at': string
        }
    ],
    'classes': {
        'id': number,
        'name': string,
        'created_at': null,
        'updated_at': null
    }
}
