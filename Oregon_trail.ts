(function () {

    //This getRandom function will return random number between the passed numbers
    //This has been used in Travelers to get a random value for Traveler Amount
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //This will give a random number between 0 and 1
    //This has been used in huntfunction to add amount for Traveleres
    function RandNumFunction() {
        return Math.random();
    }

    /*
     * Interfaces
     */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;
    }

    //interface describing what the passenger array should look like
    interface IPassengerArray {
        [index: number]: Traveler
    }

    // food(wagon)
    // Return the total amount of food among all occupants of the wagon.

    //interface describing attributes and methods a wagon should have
    interface IWagon {
        capacity: number;
        passengerArray;

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number; //its optional to add the types "number/string/boolean" here as it is defined at Interface
        name: string;
        isHealthy: boolean;

        constructor(food, name, isHealthy = true) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        hunt() {//word function is optional in typescript ..function and method are same. In object oriented programming we call function as method.
            if (RandNumFunction() > 0.5) {
                this.food = this.food + 100; //can also write like - this.food + = 100;
            }
            //if they hunted the food and the food is greater than 20 then it is healthy
            if(this.food >=20){
                this.isHealthy = true;
            }
            return this.food;
        };

        eat() {
            if (this.food >= 20) {
                this.food = this.food - 20;
            }
            else {
                this.isHealthy = false;
            }
            return this.isHealthy;
        };

    }

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity: number;
        passengerArray = [];
       // PassengerArray: Traveler[]; this is another way of writing above line

        constructor(capacity: number) {
            this.capacity = capacity;
        }

        addPassenger(traveler) {
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler);
                return "passenger added ";
            }
            else {
                return "Sorry capacity exceeded";
            }
        };

        //another way of writing addPassenger method

        // addPassenger(traveler){
        //     if(this.passengerArray.lenght >= this.capacity){
        //         return "Passenger not added";
        //     }else{
        //         this.passengerArray.push(traveler);
        //         return "Passenger added"
        //     }
        // }

        isQuarantined() {
            for (var i = 0; i < this.passengerArray.length; i++) {
                if (this.passengerArray[i].isHealthy) {
                    return  false;
                }
                else {
                    return true;
                }
            }
        };

        // This is another way of writing method for isQuarantined
        // isQuarantined() {
        //     for (var i = 0; i < this.passengerArray.length; i++) {
        //         if (!this.passengerArray[i].isHealthy) {
        //             return  true;
        //         }        
        //     }
        //     return flase;
        // };



        getFood() {
            let totalfood = 0;
            for (var i = 0; i < this.passengerArray.length; i++) {
                totalfood = totalfood + this.passengerArray[i].food;
            }
            return totalfood;
        }
  
    };


    /*
    * Play the game
    *
    * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)*/
    
    let Traveler1 = new Traveler(getRandom(0, 100), "Dyumani");
    let Traveler2 = new Traveler(getRandom(0, 100), "Matt");
    let Traveler3 = new Traveler(getRandom(0, 100), "kelly");
    let Traveler4 = new Traveler(getRandom(0, 100), "Json");
    let Traveler5 = new Traveler(getRandom(0, 100), "Eric");

    /*
    * Create wagon with an empty passenger list and a capacity of 4.*/

    let myWagon = new Wagon(4);

    /*
    * Make 3 of 5 the travelers eat by calling their eat methods*/

    console.log(`********Make 3 of 5 the travelers eat by calling their eat methods**********`);
    console.log(`The Traveler's name is ${Traveler1.name} and food count is ${Traveler1.food} and health is ${Traveler1.eat()}`);
    console.log(`The Traveler's name is ${Traveler3.name} and food count is ${Traveler3.food} and health is ${Traveler3.eat()}`);
    console.log(`The Traveler's name is ${Traveler5.name} and food count is ${Traveler5.food} and health is ${Traveler5.eat()}`);

    /* Make the remaining 2 travelers hunt*/
    console.log(`********Make the remaining 2 travelers hunt************`);
    console.log(`The Traveler's name is ${Traveler2.name} and food count is ${Traveler2.food} and health is ${Traveler2.hunt()}`);
    console.log(`The Traveler's name is ${Traveler4.name} and food count is ${Traveler4.food} and health is ${Traveler4.hunt()}`);
    
    /* Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.*/

    console.log(`********create an array of Travelers**********`);

    let myTravelerArray = [Traveler1, Traveler2, Traveler3, Traveler4, Traveler5]

    console.log(`********Add Passenger to Wagon**********`);
    for(let i=0; i< myTravelerArray.length; i++ ){
        if(RandNumFunction() > 0.5) {
               console.log(myWagon.addPassenger(myTravelerArray[i]));
                //console.log("Passenger added");        
            }
        
    }

    console.log(`********Run the isQuarantined method for the wagon**********`);
     /* Run the isQuarantined method for the wagon*/
     console.log(myWagon.isQuarantined());

    console.log(`********Run the getFood method for the wagon**********`);
    /* Run the getFood method for the wagon*/
    console.log(myWagon.getFood());

    
    
    
   
    /*
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects 
    *
    */

})();
