// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// factory object DNA
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate() {
      // randomly selecting a base in the object's dna and change the current base to different one

      const dnaBases = ["A", "T", "C", "G"]; // default base
      const newBases = dnaBases; // temp base
      let randBase = Math.floor(Math.random() * this.dna.length); // get index of random selected base from dna
      let index = dnaBases.indexOf(this.dna[randBase]); // get index of random selected base of dna from default base
      newBases.splice(index, 1); // remove the current selected random base
      this.dna[randBase] =
        this.dna[Math.floor(Math.random() * newBases.length)]; // reassign to other 3 bases that is not same as current selected random base
      return this.dna; // return array of new dna bases
    },

    compareDNA(anotherObj) {
      // compare this dna object to another dna object
      let counter = 0; // counter to keep track of the common element
      for (let i = 0; i < this.dna.length; i++) {
        // outer loop
        for (let j = 0; j < anotherObj.dna.length; j++) {
          // inner loop
          if (this.dna[i] === anotherObj.dna[j] && i === j) {
            // if both objects have the same base at the same location/index, increases a counter
            counter++;
          }
        }
      }
      return `specimen #${this.specimenNum} and specimen #${
        anotherObj.specimenNum
      } have ${((counter / this.dna.length) * 100).toFixed(2)}% DNA in common`; // return a string states the percentage in common of both dna objects
    },

    willLikelySurvive() {
      // check if dna survives if it contains atleast 60% base C or G
      let counterC = 0; // counter to keep track num of base C
      let counterG = 0; // counter to keep track num of base G
      for (const base of this.dna) {
        // loop thru array dna
        if (base === "C") {
          // increase counter for base C if matched
          counterC++;
        }
        if (base === "G") {
          // increase counter for base G if matched
          counterG++;
        }
      }

      // get the total percentage of base C and G
      let survivalC = (counterC / this.dna.length) * 100;
      let survivalG = (counterG / this.dna.length) * 100;
      return survivalC >= 60 || survivalG >= 60 ? true : false;
    },

    complementStrand() {
      // replace base A with T and base C with G, same with the other direction.
      const list = []; // new list to contains replaced bases
      for (let base of this.dna) {
        // loop thru dna array
        if (base === "A") {
          // replace A with T
          list.push("T");
        } else if (base === "T") {
          // replace T with A
          list.push("A");
        } else if (base === "C") {
          // replace C with G
          list.push("G");
        } else if (base === "G") {
          // replace G with C
          list.push("C");
        }
      }
      return list; // return a complementary DNA strand
    },

    findMostRelated(anotherObj) {
      // same as compareDNA() but return a number instead
      let counter = 0; // counter to keep track of the common element
      for (let i = 0; i < this.dna.length; i++) {
        // outer loop
        for (let j = 0; j < anotherObj.dna.length; j++) {
          // inner loop
          if (this.dna[i] === anotherObj.dna[j] && i === j) {
            // if both objects have the same base at the same location/index, increases a counter
            counter++;
          }
        }
      }
      return (counter / this.dna.length) * 100; // return a percentage of likelyhood
    },
  };
};

// function to produce 30 healthy instances
const produceInstances = () => {
  let instances = 0; // a counter to keep track of num healthy instances
  const healthyInstances = []; // array to store 30 healthy instances
  while (instances < 30) {
    // loop until we have 30 healthy instances
    const dnas = pAequorFactory(instances + 1, mockUpStrand());
    if (dnas.willLikelySurvive) {
      // only add instances to array if it is healthy
      healthyInstances.push(dnas);
      instances++;
    }
  }
  return healthyInstances; // return array of 30 healthy instances
};

// function to find 2 most related instances from healthy instances array
const findRelated = (healthyDna) => {
  const pairsRelated = []; // array to stores 2 most related instances
  let counterMax = 0; // counter to keep track the most related
  let counter = 0; // counter to keep track every instances relations

  for (let i = 0; i < healthyDna.length; i++) {
    for (let j = i + 1; j < healthyDna.length; j++) {
      counter = healthyDna[i].findMostRelated(healthyDna[j]);

      if (counter > counterMax) {
        // if another pairs has more relation percentages, replace the curr pairs with another pairs
        counterMax = counter;
        pairsRelated.splice(0, 2); // delete the existed value
        pairsRelated.push(healthyDna[i], healthyDna[j]); // updated the newest value
      }
    }
  }
  return pairsRelated; // return the 2 most related instances
};

// function to print info of 2 most related instances
const printRelatedDNA = (relatedDNA) => {
  // a loop to print info of 2 most related instances
  for (let i = 0; i < relatedDNA.length - 1; i++) {
    console.log(`The two most related instances are: `);
    console.log(relatedDNA[i].dna + " and " + relatedDNA[i + 1].dna);
    console.log(relatedDNA[i].compareDNA(relatedDNA[i + 1]));
  }
};

const newDna = pAequorFactory(1, [
  "G",
  "G",
  "T",
  "T",
  "A",
  "G",
  "T",
  "T",
  "T",
  "T",
  "A",
  "G",
  "C",
  "T",
  "C",
]);
// console.log(newDna.dna);
// console.log(newDna.complementStrand());
// console.log(newDna.mutate());

// compare 2 test cases
const ex1 = ["A", "T", "T", "T"];
const ex2 = ["C", "T", "T", "T"];
const ex3 = ["A", "G", "G", "C"];
const dna1 = pAequorFactory(1, ex1);
const dna2 = pAequorFactory(2, ex2);
// console.log(dna1.compareDNA(dna2));

// 30 survival instances
const healthyInstances = produceInstances();

// find the 2 most related instances
const relatedInstances = findRelated(healthyInstances);
printRelatedDNA(relatedInstances);
