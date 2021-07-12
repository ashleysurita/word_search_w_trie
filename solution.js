class Trie {
    constructor() {
        this.root = {}; 
        this.endSymbol = '*'
    }
    
    add(word){
        let curr = this.root
        // map letters of word to the trie
        for(const char of word){
            if(!curr[char]) curr[char] = {}
            curr = curr[char]
        }
        // add end symbol to indicate end of word, symbol holds the whole word
        curr[this.endSymbol] = word
    }
}

function dfs(trieNode, row, col, m, n, board, finalWords) {
	// in bounds check or have we visited we want to return and not startsWith 
	if (row < 0 || row >= m || col < 0 || col >= n || board[row][col] === '$') return; 
    
	const char = board[row][col]; 
	// Not in trieNode break
	if (!(char in trieNode)) return; 
	// Mark as visited
	board[row][col] = '$'; 
	// Update trie node at the letter 
	trieNode = trieNode[char]; 
	// If the asterisk is in the trieNode add it to container
	if ("*" in trieNode) finalWords[trieNode["*"]] = true; 
	// Directions:
	dfs(trieNode, row - 1, col, m, n, board, finalWords);
	dfs(trieNode, row + 1, col, m, n, board, finalWords);
	dfs(trieNode, row, col - 1, m, n, board, finalWords);
	dfs(trieNode, row, col + 1, m, n, board, finalWords);
	// Revert back 
	board[row][col] = char; 
}

var findWords = function(board, words){
    const trie = new Trie()
    // create our base trie
    for(const str of words){
        trie.add(str)
    }
    
    // dimensions:
    let m = board.length
    let n = board[0].length
    
    // object for results
    const finalWords = {}; 
	
	for (let row = 0; row < m; row++) {
		for (let col = 0; col < n; col++) {
			dfs(trie.root, row, col, m, n, board, finalWords)
		}
	}
	
	return Object.keys(finalWords);
}

