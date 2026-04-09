let form = document.querySelector("form");
let currentAddress = form["currentAddress"];
let currentInputs = Array.from(currentAddress.querySelectorAll("input"));

let permanentAddress = form["permanentAddress"];
let permanentInputs = permanentAddress.querySelectorAll("input");

let checkbox = permanentInputs[0];

permanentInputs = Array.from(permanentInputs).slice(1);


// Event listener on checkbox to copy current address into permanent address.
checkbox.addEventListener("change", (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
        updateValues();
        lockFields();
    } else {
        unlockFields();
    }
})


// Update permanent address parallely with changes made in current address if checkbox is checked.
currentAddress.addEventListener("input", (e) => {
    if (checkbox.checked) {
        let index = currentInputs.findIndex((currInput) => currInput === e.target);
        permanentInputs[index].value = e.target.value;
    }
})


// Prevent form submission and check for invalid pincodes.
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let pincodeInputs = form.querySelectorAll("input[name='pincode']");

    for (let input of Array.from(pincodeInputs)) {
        if (input.value.length !== 6) {
            let parent = input.closest("fieldset");
            alert(`Enter valid pincode in ${parent.firstElementChild.innerText}`);
            return;
        }
    }

    alert("Form submitted!");
    form.submit();
})


// Copy values from current address fields to permanent address fields.
function updateValues() {
    for (let i = 0; i < currentInputs.length; i++) {
        permanentInputs[i].value = currentInputs[i].value;
    }
}


// Add disabled attribute in input fields.
function lockFields() {
    for (let i = 0; i < permanentInputs.length; i++) {
        permanentInputs[i].setAttribute("disabled", true);
    }
}


// Remove disabled attribute from input fields.
function unlockFields() {
    for (let i = 0; i < permanentInputs.length; i++) {
        permanentInputs[i].removeAttribute("disabled");
    }
}