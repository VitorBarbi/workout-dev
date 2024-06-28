/**
 * Sets the default value of the date input field to today's date when the DOM is fully loaded.
 * 
 * @param {Event} event - DOMContentLoaded event.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    // Create a new Date object for today's date
    const today = new Date();
    
    // Format the date to a string in the format 'YYYY-MM-DD'
    const formattedDate = today.toISOString().split('T')[0];
    
    // Set the value of the date input field with id 'startDate' to the formatted date
    document.getElementById('startDate').value = formattedDate;
});

// Create a map to keep track of exercises for each group
let groupExerciseMap = {};

// Add event listener to the "Add Group" button
document.getElementById('add-group').addEventListener('click', () => {
    addGroup()
});

/**
 * Function to add a new group.
 */
async function addGroup() {
    // Get the next group number
    const groupNumber = getLastGroupNumber() + 1;
    groupExerciseMap[groupNumber] = [];

    // Remove the previous "Add Exercise" button if it exists
    const previousAddExerciseButton = document.getElementById('add-exercise');
    if (previousAddExerciseButton) {
        previousAddExerciseButton.remove();
    }

    // Remove the previous "Remove Exercise" button if it exists
    const previousRemoveExerciseButton = document.getElementById('remove-exercise');
    if (previousRemoveExerciseButton) {
        previousRemoveExerciseButton.remove();
    }

    // Remove the previous "Remove Group" button if it exists
    const previousRemoveGroupButton = document.getElementById('remove-group');
    if (previousRemoveGroupButton) {
        previousRemoveGroupButton.remove();
    }

    // Fetch the partial view for the new group
    const response = await fetch(`/program/newGroup?groupNumber=${groupNumber}`);
    const addGroupView = await response.text();

    // Create a new div for the group and set its content
    const div = document.createElement('div');
    div.innerHTML = addGroupView;

    // Create and add the "Add Exercise" button
    const addExerciseButton = document.createElement('button');
    addExerciseButton.type = 'button';
    addExerciseButton.innerText = 'Add Exercise';
    addExerciseButton.id = 'add-exercise';
    addExerciseButton.addEventListener('click', () => {
        addExercise(groupNumber);
    });
    div.appendChild(addExerciseButton);

    // Create and add the "Remove Group" button
    const removeGroupButton = document.createElement('button');
    removeGroupButton.type = 'button';
    removeGroupButton.innerText = 'Remove Group';
    removeGroupButton.id = 'remove-group';
    removeGroupButton.addEventListener('click', () => {
        removeLastGroup()
    });
    div.appendChild(removeGroupButton);

    // Append the new group div to the groups container
    document.getElementById('groups').appendChild(div);
}

/**
 * Function to add a new exercise to a group.
 * 
 * @param {number} groupNumber - The group number to which the exercise is being added.
 */
async function addExercise(groupNumber) {
    const exercises = groupExerciseMap[groupNumber];
    const exerciseNumber = exercises.length + 1;
    groupExerciseMap[groupNumber].push(exerciseNumber);

    // Remove the previous "Remove Exercise" button if it exists
    const previousRemoveExerciseButton = document.getElementById('remove-exercise');
    if (previousRemoveExerciseButton) {
        previousRemoveExerciseButton.remove();
    }

    // Fetch the partial view for the new exercise
    const response = await fetch(`/program/newExercise?exerciseNumber=${exerciseNumber}&groupNumber=${groupNumber}`);
    const addExerciseView = await response.text();

    // Create a new div for the exercise and set its content
    const div = document.createElement('div');
    div.innerHTML = addExerciseView;

    // Create and add the "Remove Exercise" button
    const removeExerciseButton = document.createElement('button');
    removeExerciseButton.innerText = 'Remove Exercise';
    removeExerciseButton.id = 'remove-exercise';
    removeExerciseButton.addEventListener('click', () => {
        removeLastExercise();
    });
    div.appendChild(removeExerciseButton);

    // Append the new exercise div to the exercises container for the group
    document.getElementById(`group-${groupNumber}-exercises`).appendChild(div);
}

/**
 * Function to get the last group number.
 * 
 * @returns {number} - The last group number.
 */
function getLastGroupNumber() {
    const groups = Object.keys(groupExerciseMap);
    const lastGroupNumber = groups.length;
    return lastGroupNumber;
}

/**
 * Function to get the last exercise number and group number.
 * 
 * @returns {Array} - An array containing the last exercise number and last group number.
 */
function getLastExerciseAndGroupNumber() {
    const lastGroupNumber = getLastGroupNumber();
    const lastExerciseNumber = groupExerciseMap[lastGroupNumber].length;
    return [lastExerciseNumber, lastGroupNumber];
}

/**
 * Function to remove last group.
 */
function removeLastGroup() {
    const lastGroupNumber = getLastGroupNumber();

    // If last group is 1, remove the "Remove Group" button and "Add Exercise" button
    if (lastGroupNumber == 1) {
        const removeGroupButton = document.getElementById('remove-group');
        const addExerciseButton = document.getElementById('add-exercise');

        removeGroupButton.remove();
        addExerciseButton.remove();
    }

    // Remove the group div and delete the group from the map
    const groupDiv = document.getElementById(`group-${lastGroupNumber}`);
    groupDiv.remove();
    delete groupExerciseMap[lastGroupNumber];
}

/**
 * Function to remove last exercise in the last group.
 */
function removeLastExercise() {
    const [lastExerciseNumber, lastGroupNumber] = getLastExerciseAndGroupNumber();

    // If last exercise is 1, remove the "Remove Exercise" button
    if (lastExerciseNumber == 1) {
        const removeExerciseButton = document.getElementById('remove-exercise');
        removeExerciseButton.remove();
    }

    // Remove the exercise div and update the exercises list in the map
    const exerciseDiv = document.getElementById(`exercise-${lastExerciseNumber}-group-${lastGroupNumber}`);
    exerciseDiv.remove();
    const exercises = groupExerciseMap[lastGroupNumber];
    groupExerciseMap[lastGroupNumber] = exercises.filter(exercise => exercise !== lastExerciseNumber);
}

/**
 * Function to prepare form data before submitting.
 * 
 * @param {Event} event - Form submit event.
 */
function prepareFormData(event) {
    const groups = [];
    
    // Iterate through each group in the groupExerciseMap
    Object.keys(groupExerciseMap).forEach(groupNumber => {
        // Create an array of exercises for the current group
        const exercises = groupExerciseMap[groupNumber].map(exerciseNumber => {
            return {
                exerciseNumber,
                // Get the name value from the corresponding exercise input field
                name: document.getElementById(`exercise-${exerciseNumber}-group-${groupNumber}-name`).value,
                // Get the sets value from the corresponding exercise input field
                sets: document.getElementById(`exercise-${exerciseNumber}-group-${groupNumber}-sets`).value,
                // Get the reps value from the corresponding exercise input field
                reps: document.getElementById(`exercise-${exerciseNumber}-group-${groupNumber}-reps`).value
            };
        });

        // Push the group data into the groups array
        groups.push({
            groupNumber,
            // Get the key value from the corresponding group input field
            key: document.getElementById(`group-key-${groupNumber}`).value,
            // Get the target muscles value from the corresponding group input field
            targetMuscles: document.getElementById(`target-muscles-${groupNumber}`).value,
            // Add the exercises array to the group
            exercises
        });
    });

    // Create a formData object to hold the start date and groups array
    const formData = {
        startDate: document.getElementById('startDate').value,
        groups: groups
    };
    
    // Set the value of the hidden input field to the stringified groups array
    document.getElementById('groups-input').value = JSON.stringify(groups);
}

// Add event listener to the form to prepare data before submission
document.getElementById('program-form').addEventListener('submit', prepareFormData);