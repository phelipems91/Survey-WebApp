// IIFE - Immediately Invoked Function Expression
(() => {

  function Start() {
    console.log('App started...');
  }
  window.addEventListener('load', Start);

})();

function changeQuestionType(fields){
  if(fields.value === "multipleChoice"){
    fields.nextSibling.childNodes[0].firstChild.type="text";
    fields.nextSibling.childNodes[1].firstChild.type="text";
    fields.nextSibling.childNodes[2].firstChild.type="text";
    fields.nextSibling.childNodes[3].firstChild.type="text";
  }
  else{
    fields.nextSibling.childNodes[0].firstChild.type="hidden";
    fields.nextSibling.childNodes[1].firstChild.type="hidden";
    fields.nextSibling.childNodes[2].firstChild.type="hidden";
    fields.nextSibling.childNodes[3].firstChild.type="hidden";
  }
  
}

