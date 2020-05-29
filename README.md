What is Supermask.js?
===================================

Supermask.js is a full-javascript mask, supposed to work in any of the big browsers. Since it's pure javascript, and consists of only one file, it should be simple enough to be plug'n play for any kind of framework you might use (AngularJS, Angular 2+, React, Vue, plain JS, and so on).

Why?
===================================

Supermask.js is a desperate attempt for a decent mask in an AngularJS (1.0.0) app I have to mantain at work. Most pure-js masks are crap, and I couldn't find anything that would work with AngularJS 1.0.0, so I decided to make a mask that would suit my needs, and offer decent user experience.


How do I use it?
===================================

It should be very plug'n play. Just download the project here on GitHub, and do the following:


- Import the mask:

      <script src="index.js"></script>

Since window.onload does not work everywhere, the import should be put at the end of your HTML file, to make sure every field has already loaded on your view.

- Add the class and mask to your field:

      <input
        mask="999.999.999-99"
        class="maskField">

Those are the only requirements for the mask to work. You can add as any fields as you want in your HTML, the mask will know how to handle it.

How do I create a mask?
===================================

The mask is an attribute your field will have. It may consist of numbers, symbols, and letters.

- Numbers:

0 - 9, if you put a '3' in your mask, no number bigger than 3 can be inputted on that position, for example, the mask "9-33" may have any number on its first position, but the last two may only contain numbers between 0 and 3. 

- Inverted numbers:

If you add the 'inverted-numbers' attribute to any mask field, the numbers of the mask will actually represent the minimum value that can be inputted in that position. For example, if the mask has any '8' in it, it means that the only accepted numbers in that position are 8 and 9.

- Any letter:

If your mask should accept any kind of letter (uppercase or lowercase), you can add the 'Á' in your definition, and it will allow any kind of alphabetic input on that position. For example, the mask 'ÁÁÁ-1' will allow any 3 alphabetic values on its first 3 positions, an then allow only 0 and 1 for the last position.

- Uppercase letter:

If you want to lock a letter to be uppercase, you can simply add a 'A' in that mask position. For example, the mask 'AAA' will only allow uppercase letters.

- Lowercase letter:

If you want to lock a letter to be lowercase, you can simply add a 'a' in that mask position. For example, the mask 'aaa' will only allow lowercase letters.

- Alphanumeric letter:

Now, if you want to allow a specific position to accept anything, from numbers to letters to symbols, just add 'Ã' in your mask. For example, the mask '0-Ã' will only allow 0 for its first position, an then anything for its last.

- Block pasting:

If you want to stop your user from pasting inside the field, you can just add the 'blockpasting' attribute. NOTE: Pasting is allowed by default, and the mask will work normally even if the pasted value has no mask (or half a mask).

- Symbols:

Any symbol present in your mask definition will be automatically added when your user is inputting in the field. For example, all the dashes in the mask '99-99-99' will be added while the user types, on pasting, and validated on focusout. The symbols will also be validated and added if the input receives a value via drag and drop.

Dynamic mask change
===================================
If you want to change a mask dynamically, all you have to do is change it's "mask" attribute, and then run the "rebuildMasks" function, that will be responsible for rebuilding the mask events in each field (more to come).

Where can I see this working?
===================================

If you want to take a look at the mask's UX, you can check it here: https://supermaskjs.stackblitz.io

And if you want to play with its code a little bit, take a look here: https://stackblitz.com/edit/supermaskjs?file=index.html

Although, I recommend you download the project and play with the HTML file you'll find. That's because the Stackblitz console won't allow you to call any functions ;/

That's all, folks!
===================================
Please, take a moment to connect with me on Linkedin: https://www.linkedin.com/in/vinícius-chab/, and have a great day!

License
===================================
MIT - Vinícius Chab
