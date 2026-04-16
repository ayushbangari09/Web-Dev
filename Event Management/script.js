function validateForm() {
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let phone = document.getElementsByName("phone")[0].value;

    if (!name || !email || !phone) {
        alert("⚠️ Please fill all fields");
        return false;
    }

    if (!email.includes("@")) {
        alert("❌ Invalid email");
        return false;
    }

    if (phone.length < 10) {
        alert("❌ Invalid phone number");
        return false;
    }

    return true;
}
