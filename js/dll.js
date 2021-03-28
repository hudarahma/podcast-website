class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
}
  
class DoubleLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    getLength(){
      return this.length;
    }
  
    /**
     * Push a new value to the head of the linked list.
     */
  
    push(value) {
      const newNode = new Node(value);
  
      if(!this.head){
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
  
      this.length+=1;
      return this;
    }
  
    /**
     * Remove an item from the end of the linked list.
     */
    pop() {
      // In case of empty DoubleLinkedList
      if (this.length === 0) return false;
  
      // get popped node
      const popped = this.tail;
      const newTail = this.tail.prev;
  
      if (newTail) {
        // Sever the connection from the popped node
        newTail.next = null;
        this.tail.prev = null;
      } else {
        // If newTail is empty, then there is only one element in the list, make sure
        // to remove the reference from the head.
        this.head = null;
      }
  
      // Assign the new tail (could be empty)
      this.tail = newTail;
      this.length--;
      return popped;
    }
  
    /**
     * Remove a node from the beginning of the list.
     */
    shift() {
      // incase list is empty;
      if (this.length === 0) return false;
      const shiftedNode = this.head;
  
      // make the new head the next (might be null)
      const newHead = this.head.next;
      // The list isn longer than One
      if (this.head !== this.tail) {
        newHead.prev = null;
        shiftedNode.next = null;
      } else {
        this.tail = null;
      }
  
      this.head = newHead;
      this.length--;
      return shiftedNode;
    }
  
    /**
     * Add a node to the head of the linked list.
     */
    unshift(value) {
      const node = new Node(value);
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      }
      this.length++;
      return this;
    }
  
    /**
     * Get a Node at a specific index
     */
    
    // getNodeAtIndex(index) {
    //   let node = this.head;
    //   let currIndex = 0;
  
    //   if ( index >= this.length || index < 0) return null;
    //   while(currIndex != index){
    //     node = node.next;
    //     currIndex+=1;
    //   }
    //   return node;
     
    // }
    getNodeAtIndex(index) {
      if (index > this.length) {
        return false;
      }
  
      if (index === 0) {
        return this.head;
      } 
      
      else if (index === this.length - 1) {
        return this.tail;
      } else {
        let current = this.head;
        let counter = 0;
        while (counter < index) {
          current = current.next;
          counter++;
        }
        return current;
      }
    }
  
  
  
    /**
     * Set a node at a specific index.
     */
    setNodeAtIndex(index, value) {
      const foundNode = this.getNodeAtIndex(index);
      if (foundNode) {
        foundNode.value = value;
        return foundNode;
      }
      return null;
    }
  
    /**
     *  Insert a node at a specific index.
     */
    insertAtIndex(index, val) {
      //if index doesn't exist
      if (index > this.length) {
        return false;
      }
      if (index === 0) {
        this.unshift(val);
      } else if (index === this.length) {
        this.push(val);
      } else {
        const newNode = new Node(val);
        const after = this.getNodeAtIndex(index);
        const before = after.prev;
        after.prev = newNode;
        before.next = newNode;
        newNode.next = after;
        newNode.prev = before;
        this.length++;
      }
      return this;
    }
  
    /**
     * Remove a node at a specific index.
     */
    removeAtIndex(index) {
      let removedNode;
      if (index >= this.length) {
        return false;
      }
      if (index == 0) {
        removedNode = this.shift();
      } else if (index == this.length - 1) {
        removedNode = this.pop();
      } else {
        removedNode = this.getNodeAtIndex(index);
        const after = removedNode.next;
        const before = removedNode.prev;
        removedNode.next = null;
        removedNode.prev = null;
        before.next = after;
        after.prev = before;
        this.length--;
      }
      return removedNode;
    }
}
  
  
  