// ====================
// 1. Longest Substring Without Repeating Characters
// ====================
function lengthOfLongestSubstring(s) {
    let set = new Set();
    let left = 0;
    let max = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        max = Math.max(max, right - left + 1);
    }

    return max;
}

// ====================
// 2. Group Anagrams
// ====================
function groupAnagrams(strs) {
    const map = {};

    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!map[key]) map[key] = [];
        map[key].push(str);
    }

    return Object.values(map);
}

// ====================
// 3. Longest Palindromic Substring
// ====================
function longestPalindrome(s) {
    let result = "";

    function expand(left, right) {
        while (
            left >= 0 &&
            right < s.length &&
            s[left] === s[right]
        ) {
            left--;
            right++;
        }

        return s.slice(left + 1, right);
    }

    for (let i = 0; i < s.length; i++) {
        const odd = expand(i, i);
        const even = expand(i, i + 1);

        if (odd.length > result.length) result = odd;
        if (even.length > result.length) result = even;
    }

    return result;
}

// ====================
// 4. String Compression
// ====================
function compress(chars) {
    let write = 0;
    let read = 0;

    while (read < chars.length) {
        let char = chars[read];
        let count = 0;

        while (read < chars.length && chars[read] === char) {
            read++;
            count++;
        }

        chars[write++] = char;

        if (count > 1) {
            for (const digit of String(count)) {
                chars[write++] = digit;
            }
        }
    }

    return write;
}

// ====================
// 5. Zigzag Conversion
// ====================
function convert(s, numRows) {
    if (numRows === 1 || s.length <= numRows) return s;

    const rows = Array.from(
        { length: numRows },
        () => ""
    );

    let currentRow = 0;
    let goingDown = false;

    for (const char of s) {
        rows[currentRow] += char;

        if (
            currentRow === 0 ||
            currentRow === numRows - 1
        ) {
            goingDown = !goingDown;
        }

        currentRow += goingDown ? 1 : -1;
    }

    return rows.join("");
}

// ===== Тести =====
console.log("1:", lengthOfLongestSubstring("abcabcbb"));
console.log("2:", groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
console.log("3:", longestPalindrome("babad"));

let chars = ["a","a","b","b","c","c","c"];
console.log("4:", compress(chars));

console.log("5:", convert("PAYPALISHIRING", 3));