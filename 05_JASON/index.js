let userObj =
{
    username: "yafaaawa",
    grade: 85,
    password: "pass123",
    isConnected: true,
    address: {
        country: "Isreal",
        city: "KASH",
        street: "ben gurion"
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 80, 90, 100, 85]
}

let newGrade = userObj.grade + 10;
userObj.grade += 10;
userObj.id = 1000;

userObj2 = userObj;
userObj.grade += 10;
userObj2.grade = 0;
let grade1 = userObj.grade;

userObj.adress.street = "";
userObj.adress["adress"].city = "TEL AVIV";

let arr = [userObj, {
    username: "yafaaawa",
    grade: 85,
    password: "pass123",
    isConnected: true,
    address: {
        country: "Isreal",
        city: "KASH",
        street: "ben gurion"
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 80, 90, 100, 85]
}]

arr[0].allGrades[1] = { cpp: 80 };
arr[1].avg = 95;
let user2 = arr[1];
user2.password = "12345";