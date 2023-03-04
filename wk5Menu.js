
// Class named species to refer to the different types of wood/lumber
// constructor designated with the variables name & quantity with a description showing there were x number of each type of species.
class Species{ 
    constructor(name, quantity){ 
        this.name = name; 
        this.quantity = quantity;

    }
    describe(){
        return `${this.name} has this many ${this.quantity}.`;
    }
}

// A second class Wood which takes the name of the wood list and a blank array to hold all the species created.
// method called addspecies that takes new species and determine whether the species is an instanceof(object) the Species class before pushing to the species array.

class Wood{ 
    constructor(name){
        this.name = name; 
        this.species = []; 
    }
    addspecies(species){ 
        if(species instanceof Species){ 
           this.species.push(species);
        }else{
            throw new Error(`You can only add instance of species. Argument is not a species: ${species}`); 
        }
        }
        describe() {
            return `${this.name} has ${this.species.length} available.`; 
        }
    }

    // New menu class that drives choices in the application, initialize the wood variable array & a selected variable to help determine which choices are being selected from the index.
class Menu{
    constructor(){
        this.wood = []; 
        this.selected = null; // set to null because at start, no teams are selected 
    }

    // point of entry to application
    // build out of menu with methods that do not yet exist, followed by implementation of those methods.
    start(){
        let selection = this.showMenuOptions();

        while (selection != 0){ // 0 is the exit, so while any other key option 1-4 is chosen the loop will continue.
            switch(selection){
                case '1': 
                    this.createWoodList();
                     break;
                case '2': 
                    this.viewWoodList();
                    break;
                case '3': 
                    this.deleteWoodList();
                    break;
                case '4': 
                    this.displayWoodList();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMenuOptions();
        }

        alert('Goodbye!');
    }

    //display of index choices that will appear to user on the Main menu.

    showMenuOptions(){
        return prompt (`
        0) exit
        1) create new wood list
        2) view list
        3) delete list
        4) display all wood lists
        `);
    }

    // sub-menu of index options that prompt user input for list

    showLumberMenuOptions(lumberInfo){ 
        return prompt(`
           0) back
            1) enter desired lumber type
            2) delete lumber type
            --------------------------
            ${lumberInfo}
        `);
    }

    // implementation of methods for Main menu options
    // creation of blank string w/ a for loop to iterate through this.wood array and concatenate all info contained within.
    //grab each wood type name in array, to show the names with an index number and a new line.
    displayWoodList(){
        let woodString = ''; 
        for(let i = 0; i < this.wood.length; i++){ 
            woodString += i + ')' + this.wood[i].name + '\n'; 
        }
        alert(woodString); //display of wood type names.
    }

    // method for creating new list, takes one parameter(name), then pushes new instanceof object into the wood array.
    createWoodList(){ 
        let name = prompt('Enter name for new wood list:');
        this.wood.push(new Wood(name)); 
    }

    // view details of specific list
    // starts with user entering index of created list to view
    // while index is greater than -1.... to prevent errors and validate user input
    viewWoodList(){ 
        let index = prompt('Enter the index of the lumber list you wish to view:');
        if (index > -1 && index < this.wood.length){ 
            this.selectedType = this.wood[index]; // set selection of wood type to the wood array index
            let description = 'List name: ' + this.selectedType.name + '\n'; 
            
            // loop to iterate the seleced type through the species array to get length from that array
            // description prints out index, plus the selected type name from species array, along with the quantity required from user input.
            for (let i = 0; i < this.selectedType.species.length; i ++){ 
                description += i + ' ) ' + this.selectedType.species[i].name 
                 + ' - ' + this.selectedType.species[i].quantity + '\n'; 
            }

            // sub-menu for user to input desired information that will make up the list.
            let selection = this.showLumberMenuOptions(description); 
            switch (selection){
                case '1':
                    this.createLumberType();
                    break;
                case '2': 
                    this.deleteLumberType();
            }
        }
    }

    // method for deleting list from wood []
    deleteWoodList(){
        let index = prompt('Enter the index of the team you wish to delete:');
        if (index > -1 && index < this.wood.length){
            this.wood.splice(index, 1); 
        }
    }
   
    // method for creating desired lumber type & quantity to add to the list
    // Example would be "walnut 20 board ft".
    // takes instanceOf Species name & quantity and pushes them to selected type [].
    createLumberType(){ 
        let name = prompt('Enter lumber type:'); 
        let quantity = prompt('Enter amount of material needed:'); 
        this.selectedType.species.push(new Species(name, quantity)); // selected type variable helps know which list is selected and being added to, and allows for quick reference.
    }

    deleteLumberType(){ 
        let index = prompt('Enter the index of the lumber you wish to remove material for:'); 
        if (index > -1 && index < this.selectedType.species.length){ // validation of user input from appropriate []
            this.selectedType.species.splice(index, 1); // looks at indicated index and removes 1 element.
        }
    }
}

let menu = new Menu();
menu.start();