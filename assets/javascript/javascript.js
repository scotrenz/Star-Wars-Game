
var hero;
var enemy;
var fight = false;
var attackVal = 0;
var character = [];
character[0] = {
    name: "Obi-Wan Kenobi",
    attack: 8,
    health: 120,
    image: "https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif"
};
character[1] = {
    name: "Luke Skywalker",
    attack: 5,
    health: 100,
    image: "https://media.giphy.com/media/26tP1PZCE3xiDloqc/giphy.gif"
};
character[2] = {
    name: "Darth Vader",
    attack: 20,
    health: 150,
    image: "https://media.giphy.com/media/K9yzeKyvvva9i/giphy.gif"
};
character[3] = {
    name: "Darth Maul",
    attack: 25,
    health: 180,
    image: "https://media.giphy.com/media/e7FOBuKCDtwWI/giphy.gif"
};


function createChar() {

    for (var i = 0; i < character.length; i++) {

        $("#characters").append("<div class='charBox'><div>" + character[i].name + "</div><img src='" + character[i].image + "'><div> Health: <span  id= 'hero-health'>" + character[i].health + "</span></div></div>")
        $("#reset").hide();
    };
};

function createEnemies() {
    for (var i = 0; i < character.length; i++) {

        $("#enemies").append("<div class='enemyBox'><div>" + character[i].name + "</div><img src='" + character[i].image + "'><div> Health: <span> " + character[i].health + "</span></div></div>")
    };
}
createChar();

$(".charBox").on("click", function chosenClick() {
    var heroIndex = $(this).index()
    hero = character.splice(heroIndex, 1)
    $("#chosen-character").append(this);
    $("#characters").html("")
    console.log(hero);
    createEnemies();
    $(".charBox").off("click", chosenClick);



    $(".enemyBox").on("click", function() {
        if (fight === false) {
            var enemyIndex = $(this).index();
            enemy = character.splice(enemyIndex, 1);
            $("#chosen-enemy").append(this);
            $("#chosen-enemy").html("");
            $("#chosen-enemy").html("<div class='enemyBox'><div>" + enemy[0].name + "</div><img src='" + enemy[0].image + "'><div> Health: <span  id= 'enemy-health'> " + enemy[0].health + "</span></div></div>");
            console.log(enemy);
            fight = true;
            $("#damage-info").html("")
        }
    })

})


$("#attack").on("click", function attack() {
    if (fight === false) {
        $("#damage-info").html("Choose an enemy!")
        //$("#attack").off("click", attack);
    } else {

        attackVal = attackVal + hero[0].attack;
        enemy[0].health = enemy[0].health - attackVal;
        hero[0].health = hero[0].health - enemy[0].attack;

        console.log(hero[0].health);

        console.log(enemy[0].health)
        $("#hero-health").html(hero[0].health);
        $("#enemy-health").html(enemy[0].health);
        $("#damage-info").html("You attacked " + enemy[0].name + " for " + attackVal + " damage. <br>" + enemy[0].name + " attacked you for " + enemy[0].attack + " damage.");

        console.log(attackVal)
        if (enemy[0].health <= 0) {
            $("#damage-info").html("You have defeated " + enemy[0].name + ". You can choose to fight another enemy.")
            $("#chosen-enemy").empty()
            fight = false;

        }
        if (character.length === 0) {
            $("#damage-info").html("<h1>You WIN!!!</h1>");
            $("#reset").show();
            $("#attack").off("click", attack);
            $("#chosen-enemy").empty()
        }
        if (hero[0].health <= 0) {
            $("#hero-health").html(0);
            $("#attack").off("click", attack);
            $("#damage-info").html("<h1>You LOSE!!!<h1>");
            $("#reset").show();
        }
    }
})

$("#reset").on("click", function() {
    location.reload();

})