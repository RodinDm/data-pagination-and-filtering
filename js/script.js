const studentList = document.querySelector('.student-list');
const pagination = document.querySelector('.pagination');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');
const noResult = document.querySelector('.no-results');

const label = createElement('label');
label.for = 'search';
label.className = 'student-search';

const input = createElement('input');
input.id = 'search';
input.placeholder = 'Search by name...';

const button = createElement('button');
button.type = 'button';

const buttonImg = createElement('img');
buttonImg.src = 'img/icn-search.svg';
buttonImg.alt = 'Search icon';

button.appendChild(buttonImg);
header.appendChild(label);
label.append(input, button);

addPagination(list);
showPage(list, 1);

input.addEventListener('keyup', function () {
   const newArray = [];
   const value = input.value.toLowerCase();
   for (let i = 0; i < list.length; i++) {
      const name = list[i].name;
      if (name.first.toLowerCase().includes(value) || name.last.toLowerCase().includes(value) || name.title.toLowerCase().includes(value)) {
         newArray.push(list[i]);
      }
   }
   if (newArray.length === 0) {
      noResult.style.display = 'block';
   }
   else {
      noResult.style.display = 'none';
   }
   
   addPagination(newArray);
   showPage(newArray, 1);
});

function showPage(list, page) {
   const startIndex = (page - 1) * 9;
   const endIndex = page * 9;
   studentList.innerHTML = '';
   
   for (let i = startIndex; i < endIndex; i++) {
      if (list[i] === undefined) return;
      
      const studentItem = createElement('li');
      studentItem.className = 'student-item cf';
      
      const divStudentDetails = createElement('div');
      divStudentDetails.className = 'student-details';
      
      const divJoinedDetails = createElement('div');
      divJoinedDetails.className = 'joined-details';
      
      const img = createElement('img');
      img.className = 'avatar';
      img.src = list[i].picture.large;
      img.alt = 'Profile Picture';
      
      const heading = createElement('h3');
      heading.textContent = list[i].name.first + ' ' + list[i].name.last;

      const spanEmail = createElement('span');
      spanEmail.className = 'email';
      spanEmail.textContent = list[i].email;
      
      const spanDate = createElement('span');
      spanDate.className = 'date';
      spanDate.textContent = 'Joined ' + list[i].registered.date;
      
      divStudentDetails.append(img, heading, spanEmail);
      divJoinedDetails.appendChild(spanDate);
      studentItem.append(divStudentDetails, divJoinedDetails);
      studentList.appendChild(studentItem);
   }
}

function addPagination(items) {
   const numOfItems = Math.ceil(items.length / 9);
   linkList.innerHTML = '';
   for (let i = 0; i < numOfItems; i++) {
      const item = createElement('li');
      const button = createElement('button');
      button.type = 'button';
      button.textContent = i + 1;
      if (i == 0) {
         button.className = 'active';
      }
      button.addEventListener('click', function (event) {
         for (const child of linkList.children) {
            child.firstChild.classList.remove('active');
         }
         event.target.classList.add('active');
         showPage(list, event.target.textContent);
         
      });
      
      item.appendChild(button);
      linkList.appendChild(item);
   }
}

function createElement(element) {
   return document.createElement(element);
}
