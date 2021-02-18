//Classes
class ClassGrades {
    constructor() {
        this.studentArray = [];
        this.gradeArray = [];
    }

    setStudentArray = (studentName) => {
        this.studentArray.push(studentName);

        return;
    }

    setGradeArray = (studentGrade) => {
        this.gradeArray.push(studentGrade);

        return;
    }   
}

//Methods
//Map user input into an array of objects
let mappingUserData = (studentArray, gradeArray) => {
    //Variables
    let arrayDim = studentArray.length;
    let studentDataArray = [];

    for(let i = 0; i < arrayDim; i++) {
        let tempObj = { y: gradeArray[i], label: studentArray[i] };
        studentDataArray.push(tempObj);
    }

    return studentDataArray;
}

window.onload = function () {
    //Variables
    let classGradesObj = new ClassGrades();

    //DOM Elements 
    let submitNameBtn = document.getElementById("submit-name-btn");
    let generateChartBtn = document.getElementById("generate-chart-btn");

    //User name submit event listener
    submitNameBtn.addEventListener('click', (event) => {
        event.preventDefault();

        //DOM Elements
        let studentName = document.getElementById("user-name").value.trim();
        let studentGrade = document.getElementById("user-grade").value.trim();

        //Assert user name input
        if(studentName !== "" && studentGrade !== "") {
            //Change casing of the user name input and cast grade
            studentName.toLowerCase();
            studentName[0].toUpperCase();
            studentGrade = parseInt(studentGrade);

            //Update object
            classGradesObj.setGradeArray(studentGrade);
            classGradesObj.setStudentArray(studentName);

            document.getElementById("user-name").value = "";
            document.getElementById("user-grade").value = "";
        }
        else {
            if(studentName === "") {
                //DOM Elements
                let userNameInput = document.getElementById("user-name");

                //Update input field with error message
                userNameInput.value = "Provide an input";
            }

            if(studentGrade === "") {
                //DOM Elements
                let userGradeInput = document.getElementById("user-grade");

                //Update input field with error message
                userGradeInput.value = "Provide an input";
            }

            return;
        }
    });

    //Chart render event listener
    generateChartBtn.addEventListener('click', (event) => {
        event.preventDefault();

        //Variables
        let chartData = mappingUserData(classGradesObj.studentArray, classGradesObj.gradeArray);

        //CanvasJS charts
        let gradeChart = new CanvasJS.Chart("chart-container", {
            animationEnabled: true,
            theme: "dark2",
            title: {
                text: "Student grades"
            },
            axisY: {
                title: "Avg grade %"
            },
            data: [{        
                type: "column",  
                showInLegend: true, 
                legendMarkerColor: "grey",
                dataPoints: chartData
            }]
        });

        gradeChart.render();
    });
}