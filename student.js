    function Student(firstName, lastName, yearOfBirth, lessonsCount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = +yearOfBirth;
        this.attedance = new Array(lessonsCount);
        this.marks  = new Array(lessonsCount);
        this.currentLesson = 0;
        this.lessonCount = lessonsCount;
    }

    Student.prototype.ageStudent =
        function () {
            let currentYear = new Date().getFullYear();
            return currentYear - +this.yearOfBirth;
        };
    Student.prototype.setAttendance =
        function (flag, increment=true) {
            if (this.currentLesson > this.lessonCount) throw new Error('Cannot lesson go student')
            this.attedance[this.currentLesson] = flag;
            increment ? this.currentLesson += 1 : null;
        };
    Student.prototype.present = function (mark = null) {
        this.setAttendance(true, mark === null)
        if (mark !== null) {
            this.mark(mark)
            this.currentLesson += 1
        }
    };
    Student.prototype.absent = function () {
        this.setAttendance(true)
    };
    Student.prototype.lessonRetake = function (lessonIndex, mark) {
        this.attedance[lessonIndex] =true
        this.mark(mark,lessonIndex)
    };
    Student.prototype.mark = function (mark, lessonIndex) {
        if (typeof lessonIndex === 'number') {
            this.marks[lessonIndex] = mark
            return;
        }
        this.marks[this.currentLesson] = mark
    };
    Student.prototype.calcAvgMark = function () {
        const marCalc = this.marks.reduce((acc, item) => {
                if (typeof item !== "undefined") {
                    acc.sum += item;
                    acc.lessonCount += 1;
                }
                return acc;
            },
            {
                sum: 0,
                lessonCount: 0

            })
        return marCalc.sum / marCalc.lessonCount;
    };
    Student.prototype.calcAvgAttd = function () {
        const attdCalc = this.attedance.reduce((acc, item) => {
            item ? acc += 1 : null;
            return acc;
        }, 0)
        return attdCalc / this.currentLesson;
    };


    Student.prototype.summary =
        function () {
            let score = this.calcAvgMark();
            let numberPresent = this.calcAvgAttd();
            if (score > 9 && numberPresent > 0.9) return "Ути какой молодчинка!";
            else if (score <= 9 && numberPresent > 0.9 || score > 9 && numberPresent <= 0.9)
                return "Норм, но можно лучше";
            else return "Редиска!"
}

    let student1 = new Student("Fedor", "Sherbanyuk", "1988", 10);
    let student2 = new Student("Jimmy", "Jimmy", "1986", 10);
    let student3 = new Student("Eric ", "Cartman", "2000", 10);
    student1.present(2)
    student1.present();
    student1.present(10)
    student1.present(10)
    student1.present(10)
    student1.present(10)
    student1.mark(5);
    student1.summary()