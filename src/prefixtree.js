class TrieNode{
  constructor(letter){
      this.letter=letter;
      this.isWord=false;
      this.children={};
  }

}
export default class Trie {
  constructor() {
    this.root = new TrieNode('');
  }

  insert(word) {
    if (!word) { 
      return;
    }
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!curr.children.hasOwnProperty(c)) {
        curr.children[c] = new TrieNode(c);
      }
      curr = curr.children[c];
      if (i === word.length - 1) {
        curr.isWord = true;
      }
    };
  }

  search(fragment) {
    if (!fragment) { return; }
    let curr = this.root;
    for (let i = 0; i < fragment.length; i++) {
      const c = fragment[i];
      if (!curr.children.hasOwnProperty(c)) {
        break;
      }
      curr = curr.children[c];
      if (i === fragment.length - 1 && curr.isWord) {
        return true;
      }
    }
    return false;
  }

  autocomplete(fragment) {
    if (!fragment) { return; }
    let result = [];
    let curr = this.root;
    for (let i = 0; i < fragment.length; i++) {
      const c = fragment[i];
      if (!curr.children.hasOwnProperty(c)) {
        break;
      }
      curr = curr.children[c];
      if (i === fragment.length - 1) {
        const queue = [];
        queue.push([curr, fragment]);
        while (queue.length) {
          const element = queue.shift();
          const node = element[0];
          const word = element[1];
          if (node.isWord) {
            result.push(word)
          }
          for (const j in node.children) {
            const child = node.children[j];
            queue.push([child, word + child.letter]);
          }
        }
      }
    }
    return result;
  }
}
