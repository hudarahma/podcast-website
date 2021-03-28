class Trie {
    constructor(){
        // this.end = false;
        this.words = 0;
        this.prefixes = 0;
        this.children = {};
    }

    insert(str, pos=0){
        if (str.length === 0) {
            return;
        }
        if (pos === str.length) {
        this.words++;
        return;
        }
        this.prefixes++;
        const k = str[pos];
        if (this.children[k] === undefined) {
        this.children[k] = new Trie();
        }
        const child = this.children[k];
        child.insert(str, pos + 1);
        // check if word exists
        // if (str.length === 0) return;

        // if(pos === str.length){
        //     this.end = true;
        //     return;
        // }

        // const k = str[pos];
        // if (this.children[k] === undefined) {
        //     this.children[k] = new Trie();
        // }

        // const child = this.children[k];
        // this.prefixes++;
        // child.insert(str, pos +1)
    }

    getAllWords(str='') {
        let wordStack = [];
        if (this.words > 0) {
            wordStack.push(str);
        }
      
          /* Iterate through all children and build up the prefixes to the wordStack */
        for (const k in this.children) {
        const child = this.children[k];
        wordStack = wordStack.concat(child.getAllWords(str + k));
        }
        return wordStack;
        // // if we're at the end found word push onto wordstack
        // if (this.end == true) wordStack.push(str);

        // if(this === undefined) return [];
        // // loop through the children for current letter (string)
        // for (const k in this.children) {
        //     const child = this.children[k];

        //     wordStack = wordStack.concat(child.getAllWords(str + k));
        // }
    }

    autoComplete(str, pos=0){

        const k = str[pos];
   
        if(!this.children[k]){
            return []
        }

        if(pos == str.length-1){
            return this.children[k].getAllWords(str)
        }
        return this.children[k].autoComplete(str, pos + 1);
        // {words:[]}

        // // make sure strin isn't null
        // if (str.length == 0) return [];
        // // set which letter we're working with
        // const k = str[pos];
        // // set the current child
        // const child = this.children[k];

        // // check to make sure child exists.
        // if (child === undefined) return [];

        // // iterate thorugh the string length (end - 1)
        // if (pos === str.length -1 ) return child.getAllWords(str);
        //     // if true give word;
        // // recursion

        // return child.autoComplete(str, pos +1);
    }


}