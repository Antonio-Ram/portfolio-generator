const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = profileDataArr => {

    //This..
    for (let i = 0; i < profileDataArgs.length; i++){
        console.log(profileDataArr[i]);
}

console.log('================')

//Is the same as this...
profileDataArgs.forEach((profileItem) => {
    console.log(profileItem)
});
};
printProfileData(profileDataArgs);