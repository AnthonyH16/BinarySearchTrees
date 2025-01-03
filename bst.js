class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }    
}

class Tree{
    constructor(){
        this.root = null;
    }
    
    buildTree(array, start, end){
        // let returnedArray= this.sortArray(array);
        // let nextReturnedArray = this.removeDups(returnedArray); 
        if(start > end){
            return null;
        }

        // let mid = start + Math.floor((end - start) / 2);
        // let node = new Node(nextReturnedArray[mid]);
        // node.left = this.buildTree(nextReturnedArray, start, mid-1);
        // node.right = this.buildTree(nextReturnedArray, mid+1 , end)
        let mid = start + Math.floor((end - start) / 2);
        let node = new Node(array[mid]);
        node.left = this.buildTree(array, start, mid-1);
        node.right = this.buildTree(array, mid+1 , end)
       
        return node;
    }    

    initializeBuild(array){
        this.sortArray(array);
    }

    sortArray(array){
        array.sort(function (a, b){
            if ( a < b){
                return -1;                
            }
            else if(a>b){
                return 1;
            }
        });
        // return array;
        this.removeDups(array);
    }

    removeDups(array){
        for (let i = 0; i < array.length; i++){
            if(array[i] === array[i+1]){
                array.splice(i,1);
            }
        }
        this.root = this.buildTree(array, 0, array.length-1);
        // return array;
    }


    deleteItem(value){
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node,value){//this is a function to handle the deletion, recursively
        if (node == null){ //if node is null, we got nothin'. Value not found
            console.log("Value not found.");
            return null;
        }
        //where we goin? Tree is not empty. 
        if (value < node.value){//here we go left if value less than 
            node.left = this.deleteNode(node.left, value);
        }
        else if(value > node.value){//here we go right if value more than
            node.right = this.deleteNode(node.right.value);
        }
        else{//ok we found the value in the node! because it's neither greater than nor less than
            if(node.left === null && node.right == null){//this bad boy has no children
                return null;
            }

            if(node.left ==null){//one child
                return node.right;
            }
            else if(node.right ==null){
                return node.left;
            }

            const replacement = this.findTheSmallest(node.right);//two children
            node.value = replacement.value;
            node.right = this.deleteNode(node.right, replacement.value);
        }
        return node;
    }
    
    findTheSmallest(node){
        while (node.left !== null){
            node = node.left;
        }
        return node;
    }

    find(value){
        let currentNode = this.root;        
        while(currentNode){         
            if (currentNode == value){
                return currentNode;
            }   
        if(value < currentNode.value){
            currentNode = currentNode.left;
        }
        else if (value > currentNode.value){
            currentNode = currentNode.right;
        }
        
        }
        console.log("Value was not found");
        return null;

    }
    insert(value){        
        if (this.root == null){
            this.root = new Node(value);
            return;
        }
        let currentNode = this.root;
        while(currentNode){
            if(value < currentNode.value && currentNode.left == null){
                currentNode.left = new Node(value);
                return;
            }
            else if (value > currentNode.value && currentNode.right == null){
                currentNode.right = new Node(value);
                return;
            }
            else if (value < currentNode.value){
                currentNode = currentNode.left;
            }
            else if(value > currentNode.value){
                currentNode = currentNode.right;
            }
        }
    }

    levelOrder(callback){
        if (typeof callback !== 'function'){
            throw new Error ("A callback function is required.");
        }
        const queue = [];
        let currentNode = this.root;        
        if (currentNode == null){
            return
        }
        queue.push(currentNode);
        while(queue.length !==0){
            if(currentNode.left !== null){
                queue.push(currentNode.left)
            }
            if(currentNode.right !== null){
                queue.push(currentNode.right)
            }
            currentNode = queue.shift();
            callback(currentNode)
        }
    }

    inOrder(callback){
        if (typeof callback !== 'function'){
            throw new Error ("A callback function is required.");
        }        
        function innerFunction(node){
        if (node == null){
            return
        }
        innerFunction(node.left);
        callback(node);
        innerFunction(node.right);
    }
    innerFunction(this.root);
}

    preOrder(callback){
        if (typeof callback !== 'function'){
            throw new Error ("A callback function is required.");
        } 
        function innerFunction(node){
            if(node==null){
                return
            }
            callback(node);            
            innerFunction(node.left);
            innerFunction(node.right);
        }
        innerFunction(this.root);
    }

    postOrder(callback){
        if (typeof callback !== 'function'){
            throw new Error ("A callback function is required.");
        } 
        function innerFunction(node){
            if(node==null){
                return
            }
            innerFunction(node.left);
            innerFunction(node.right);
            callback(node);
        }
        innerFunction(this.root);
    }

    height(node){
        if(node === null){
            return 0
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);        
        // if(leftHeight > rightHeight){
        //     return leftHeight + 1
        // }
        // else {
        //     return rightHeight + 1
        // }
        return Math.max(leftHeight, rightHeight) + 1; //return the max between left or right, then adds 1 for the current node
    }

    depth(node){
        if (node == null){
            return 0
        }
        if (node.parent == null){
            return 0
        }
        function calculateDepth(node){
            if (node.parent === null){
                return 0
            }
            if (node.parent){
                return calculateDepth(node.parent) + 1
            }
        }
        return calculateDepth(node);
    }

    isBalanced(){
        let node = this.root;
        if (node === null){
            return true;
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);        
        
        let difference = leftHeight - rightHeight;
        if (difference >= -1 && difference <= 1){
            return true;
        }    
    }

    rebalance(){
//add all current nodes to an array
    //traverse tree 
        let array = [];
        let currentNode = this.root;        
        if (currentNode == null){
            return
        }
        array.push(currentNode);
        while(array.length !==0){
            if(currentNode.left !== null){
                array.push(currentNode.left)
            }
            if(currentNode.right !== null){
                array.push(currentNode.right)
            }            
            
        }

        this.initializeBuild(array);
//send array to initializeBuild(array) function
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
        this.prettyPrint(node.left, prefix + (isLeft ? "│   " : "    "), true);
        this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
}

const tree = new Tree();
const testArray = [7,3,9,5,8,10,1];
tree.initializeBuild(testArray);
tree.prettyPrint();



// let array1 = [1, 1 , 2 , 2 , 3 , 3, 4];
// function removeDups(array){
//     for (let i = 0; i < array.length; i++){
//         if(array[i] === array[i+1]){
//             array.splice(i,1);
//         }
//     }
//     return array;
// }
// console.log(removeDups(array1));