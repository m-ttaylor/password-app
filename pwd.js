spaces = true;

function rand_int(min, max) {
    /* simpler, but apparently javascript's default rng is terrible */
    // return Math.floor(Math.random() * (max - min)) + min;
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    var random = array[0] / (0xffffffff + 1);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random * (max - min + 1)) + min;
}

function generate_password() {
    var length = document.getElementById('myRange').value;
    console.log("selected length is "+length);
    console.log(wordlist.length);
    var words = [];
    for (var l = 0; l < length; l++) {

        var rand_index = rand_int(0, 10000);
        words.push(wordlist[rand_index]);
    }

    if (spaces) var pwd = words.join(" ");
    else var pwd = words.join("");

    document.getElementById('password_result').innerText = pwd;

    var panel = document.getElementById("copy_button");
    if (panel.style.display !== "inline-block") {
       panel.style.display = "inline-block";
    }
}

function calculate_strength() {
    var length = document.getElementById('myRange').value;
    var perms = Math.pow(10000, parseInt(length));
    var entropy =  Math.log2(perms).toFixed(2);
    entropy = "entropy is: "+ entropy + " bits";
    document.getElementById('entropy').innerText = entropy;
}

function pass_options() {
    spaces = document.getElementById("option1").checked;
    // put additional option effects here
}

function copyToClipboard() {
    var textArea = document.createElement("textarea");
    var pwd = document.getElementById('password_result').innerText
    textArea.value = pwd;
    document.body.appendChild(textArea);
    textArea.select();
    var success = document.execCommand("Copy");
    console.log("copied to clipboard!");
    document.body.removeChild(textArea);
}
//handle accordion menu
// var acc = document.getElementsByClassName("accordion");
// var i;
//
// for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//         /* Toggle between adding and removing the "active" class,
//         to highlight the button that controls the panel */
//         this.classList.toggle("active");
//
//         /* Toggle between hiding and showing the active panel */
//         var panel = this.nextElementSibling;
//         if (panel.style.display === "block") {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//         }
//     });
// }
