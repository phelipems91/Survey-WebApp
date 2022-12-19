export class Response {
    constructor(
        public surveyId: String,
        public questions: [
            questionId: String,
            response: String
        ]
    ){}
}
