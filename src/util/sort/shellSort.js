import { getArray } from "./visualize.js";

export const code = [
  "shellSort(arr,n);",
  "\xa0\xa0\xa0\xa0n = length(arr)",
  "\xa0\xa0\xa0\xa0for gap = floor(n/2) down to 1:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0for i = gap to n-1:",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0temp = arr[i]",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0j = i",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0while j >= gap and arr[j-gap] > temp:",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[j] = arr[j-gap]",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0j = j - gap",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[j] = temp",
  " \xa0\xa0\xa0\xa0return arr",
];

export function* sort(arr) {
  yield { line: 0, array: getArray(arr, {}) };
  const n = arr.length;
  yield { line: 1, array: getArray(arr, { [n]: "n" }) };

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield { line: 2, array: getArray(arr, { [n]: "n", [gap]: "gap" }) };
    for (let i = gap; i < n; i++) {
      yield {
        line: 3,
        array: getArray(arr, { [n]: "n", [gap]: "gap", [i]: "i" }),
      };
      const temp = arr[i];
      yield {
        line: 4,
        array: getArray(arr, {
          [n]: "n",
          [gap]: "gap",
          [i]: "i",
          [temp]: "temp",
        }),
      };
      let j;
      yield {
        line: 5,
        array: getArray(arr, {
          [n]: "n",
          [gap]: "gap",
          [i]: "i",
          [temp]: "temp",
        }),
      };
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
}

export const example = {
  Python: `def shell_sort(arr):
    n = len(arr)

    gap = n//2

    #Start with a large gap, then reduce the gap
    while gap > 0:
      # Do a gapped insertion sort for this gap size
      for i in range(gap, n):
        # Add arr[i] to the elements that have been gap sorted
        # Save arr[i] in temp and make a hole at position i
        temp = arr[i]

        # Shift earlier gap-sorted elements up until the correct location for arr[i] is found
        j = i
        while j >= gap and arr[j-gap] > temp:
          arr[j] = arr[j-gap]
          j -= gap
        
        # Put temp (the original arr[i]) in its correct location
        arr[j] = temp

      # Reduce the gap
      gap //= 2

# Example usage:
my_array = [12, 34, 54, 2, 3]
shell_sort(my_array)
print("Sorted array:", my_array)`,

  JavaScript: `const shell_sort = arr => {
  const n = arr.length;
    
  //Start with a large gap, then reduce the gap
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      //Add arr[i] to the elements that have been gap sorted
      //Save arr[i] in temp and make a hole at position i
      const temp = arr[i];

      //Shift earlier gap-sorted elements up until the correct location for arr[i] is found
      let j;
      for (j = i; j  >= gap && arr[j-gap] > temp; j -= gap) {
        arr[j] = arr[j-gap];
      }

      //Put temp (the original arr[i]) in its correct location
      arr[j] = temp;
    }
  }
  return arr;
}


// Example usage:
let myArray = [12, 34, 54, 2, 3];
shell_sort(myArray);
console.log("Sorted array:", myArray);
  `,

  "C++": `#include <iostream>
          #include <vector>
          using namespace std;
  
void shellSort(vector<int>& arr) {
  int n = arr.size();

  //Start with a large gap, then reduce the gap
  for (int gap = n/2; gap > 0; gap /= 2) {
    //Do a gapped insertion sort for this gap size
    for (int i = gap; i < n; i++) {
      //Add arr[i] to the elements that have been gap sorted
      //Save arr[i] in temp and make a hole at position i
      int temp = arr.at(i);

      //Shift earlier gap-sorted elements up until the correct location for arr[i] is found
      int j;
      for (j = i; j  >= gap && arr.at(j-gap) > temp; j -= gap) {
        arr.at(j) = arr.at(j-gap);
      }
      arr.at(j) = temp;
    }
  }
}
  
int main() {
    // Example usage:
    vector<int> myArray = {12, 34, 54, 2, 3};
  
    shellSort(myArray);
  
    cout << "Sorted array: ";
    for (int i = 0; i < myArray.size(); i++) {
        cout << myArray.at(i) << " ";
    }
    return 0;
}`,
};
