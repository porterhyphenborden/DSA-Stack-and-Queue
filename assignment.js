const Stack = require('./stack');
const Queue = require('./queue');

//1. Create a stack class

    const starTrek = new Stack();
    starTrek.push('Kirk');
    starTrek.push('Spock');
    starTrek.push('McCoy');
    starTrek.push('Scotty');

//2. Useful methods for a stack

    function peek(stack) {
        if (stack.top === null) {
            return 'Stack is empty.'
        }
        return stack.top;
    }

    console.log(peek(starTrek));

    function isEmpty(stack) {
        if (stack.top === null) {
            return true;
        } else {
            return false;
        }
    }

    console.log(isEmpty(starTrek));

    function display(stack) {
        if (!stack.top) {
            return null;
        }
        currNode = stack.top;
        nodeNum = 1;
        while (currNode !== null) {
            console.log(`Node ${nodeNum}: ${currNode.value}`);
            currNode = currNode.next;
            nodeNum++;
        }
    }

    console.log(display(starTrek));
    starTrek.pop();
    console.log(display(starTrek));

//3. Check for palindromes using a stack

    function is_palindrome(str) {
        str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
        const palStack = new Stack();
        let strRev = '';

        for (let i = 0; i < str.length; i++) {
            palStack.push(str[i]);
        }
        while (palStack.top !== null) {
            strRev = strRev + palStack.pop();
        }
        if (str === strRev) {
            return true;
        }
        else {
            return false;
        }
    }

    console.log(is_palindrome("dad"));
    console.log(is_palindrome("A man, a plan, a canal: Panama"));
    console.log(is_palindrome("1001"));
    console.log(is_palindrome("Tauhida"));

//4. Matching parentheses in an expression

    function checkExpression(str) {
        const openParenth = new Stack();
        let check = true;

        for (let i = 0; i < str.length; i++) {
            if (str[i] === '(') {
                openParenth.push({
                    character: `${str[i]}`,
                    position: `${i}`
                });
            }
            if ((str[i] === ')') && (openParenth.top === null)) {
                console.log(`Close parenthesis without an open at ${i}.`)
                check = !check;
            }
            if ((str[i] === ')') && (openParenth.top !== null)) {
                openParenth.pop();
            }
        }
        if ((openParenth.top !== null) && (openParenth.top.value.character === '(')) {
            console.log(`Open parenthesis without a close at ${openParenth.top.value.position}`)
            check = !check;
        }
        console.log(check);
        return check;
    }

    checkExpression('(((somestuff) (more stuff)))');
    checkExpression('(((somestuff) more stuff)))');
    checkExpression('(((somestuff (more stuff)))');

//5. Sort stack

    function sortStack(stack) {
        let tempStack = new Stack();
        let currentNode;

        tempStack.push(stack.pop());

        while (stack.top !== null) {
            currentNode = stack.pop();

            while ((tempStack.top !== null) && (tempStack.top.value > currentNode)) {
                stack.push(tempStack.pop());
            }
            tempStack.push(currentNode);
        }
        while (tempStack.top !== null) {
            stack.push(tempStack.pop());
        }
        return stack;
    }

    function makeNumStack() {
        const stack = new Stack();
        stack.push(3);
        stack.push(2);
        stack.push(1);
        stack.push(5);
        stack.push(4);
        return stack;
    }

    const numStack = makeNumStack();

    display(numStack);
    sortStack(numStack);
    display(numStack);

//6. Create a queue using Singly linked list

    const starTrekQ = new Queue();
    starTrekQ.enqueue('Kirk');
    starTrekQ.enqueue('Spock');
    starTrekQ.enqueue('Uhuru');
    starTrekQ.enqueue('Sulu');
    starTrekQ.enqueue('Checkov');

    function peekQ(queue) {
        if (queue.first === null) {
            return 'Queue is empty.'
        }
        return queue.first;
    }

    console.log(peekQ(starTrekQ));

    function isEmptyQ(queue) {
        if (queue.first === null) {
            return true;
        } else {
            return false;
        }
    }

    console.log(isEmptyQ(starTrekQ));

    function displayQ(queue) {
        if (!queue.first) {
            return null;
        }
        currNode = queue.first;
        nodeNum = 1;
        while (currNode !== null) {
            console.log(`Node ${nodeNum}: ${currNode.value}`);
            currNode = currNode.next;
            nodeNum++;
        }
    }

    console.log(displayQ(starTrekQ));
    starTrekQ.dequeue();
    starTrekQ.dequeue();
    console.log(displayQ(starTrekQ));

//9. Square dance pairing

    const danceQ = new Queue();
    danceQ.enqueue({sex: 'F', name: 'Jane'});
    danceQ.enqueue({sex: 'M', name: 'Frank'});
    danceQ.enqueue({sex: 'M', name: 'John'});
    danceQ.enqueue({sex: 'M', name: 'Sherlock'});
    danceQ.enqueue({sex: 'F', name: 'Madonna'});
    danceQ.enqueue({sex: 'M', name: 'David'});
    danceQ.enqueue({sex: 'M', name: 'Christopher'});
    danceQ.enqueue({sex: 'F', name: 'Beyonce'});

    function pairOff(queue) {
        const waitingDancers = new Queue();
        let currentDancer = queue.dequeue();
        while (currentDancer !== null) {
            if ((queue.first === null) && (currentDancer.sex !== waitingDancers.first.value.sex)) {
                console.log(`${currentDancer.name} paired with ${waitingDancers.first.value.name}`);
                waitingDancers.dequeue();
                currentDancer = null;
            }
            else if ((waitingDancers.first === null) && (currentDancer.sex !== queue.first.value.sex)) {
                console.log(`${currentDancer.name} paired with ${queue.first.value.name}`);
                queue.dequeue();
                currentDancer = queue.dequeue();
            }
            else if ((waitingDancers.first === null) && (currentDancer.sex === queue.first.value.sex)) {
                waitingDancers.enqueue(queue.dequeue());
                console.log(`${waitingDancers.last.value.name} added to spares queue`);
            }
            else if ((waitingDancers.first !== null) && (currentDancer.sex === queue.first.value.sex)) {
                waitingDancers.enqueue(currentDancer);
                console.log(`${waitingDancers.last.value.name} added to spares queue`);
                waitingDancers.enqueue(queue.dequeue());
                console.log(`${waitingDancers.last.value.name} added to spares queue`);
                currentDancer = queue.dequeue();
            }
            else if ((waitingDancers.first !== null) && (currentDancer.sex !== queue.first.value.sex)) {
                console.log(`${currentDancer.name} paired with ${queue.first.value.name}`);
                queue.dequeue();
                currentDancer = queue.dequeue();
            }
            else if ((waitingDancers.first !== null) && (currentDancer.sex !== waitingDancers.first.value.sex)) {
                console.log(`${currentDancer.name} paired with ${waitingDancers.first.value.name}`);
                queue.dequeue();
                waitingDancers.dequeue();
                currentDancer = queue.dequeue();
            }
        }
        if (waitingDancers.first !== null) {
            console.log(`${waitingDancers.first.value.name} is first in the spares queue.`)
        }
    }

    pairOff(danceQ);




