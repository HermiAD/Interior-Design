(function(){

  // ---------- section/page definitions ----------
  // Mirrors the full "What Makes a House Feel Like Home?" design questionnaire.
  // Questions with explicit checkbox options in the source doc render as pill
  // buttons (single/multi as the question implies); open-ended questions with
  // no listed options render as free text.
  var pages = [
    {
      title:"About You & Your Lifestyle",
      fields:[
        {key:'homeFeel', type:'text', label:'What makes a space truly feel like "home" to you?'},
        {key:'moodWords', type:'multi', label:'When you walk into your home, how do you want it to make you feel?',
          opts:["Calm","Cozy","Luxurious","Energized","Peaceful","Sophisticated","Creative","Warm","Organized","Playful","Grounded"], allowOther:true},
        {key:'activities', type:'multi', label:'How do you typically spend your time at home?', hint:'Select all that apply.',
          opts:["Watching TV/movies","Cooking","Eating","Working from home","Reading","Listening to music","Entertaining friends/family","Exercising","Relaxing","Getting ready","Hobbies/creative activities"], allowOther:true},
        {key:'mustSupport', type:'text', label:'What are the 3 most important things your home needs to support in your daily life?'}
      ]
    },
    {
      title:"Your Apartment",
      intro:["Tell me about your current apartment."],
      fields:[
        {key:'apartmentType', type:'short', label:'Apartment type'},
        {key:'squareFootage', type:'short', label:'Approximate square footage'},
        {key:'numBedrooms', type:'short', label:'Number of bedrooms'},
        {key:'numBathrooms', type:'short', label:'Number of bathrooms'},
        {key:'timeLived', type:'short', label:'Approximate length of time you’ve lived there'},
        {key:'focusArea', type:'multi', label:'Which areas would you like help designing?',
          opts:["Entire apartment","Living room","Bedroom","Kitchen","Dining area","Bathroom","Closet","Entryway","Home office/workspace"], allowOther:true, required:true},
        {key:'wishChange', type:'text', label:'What is the #1 thing about your current apartment that you wish you could change?'},
        {key:'keepLove', type:'text', label:'What do you currently LOVE about your apartment and definitely want to preserve?'},
        {key:'challenges', type:'multi', label:'What are the biggest challenges you experience with your current space?',
          opts:["Layout","Lack of storage","Clutter","Lighting","Furniture size","Lack of personality","Awkward corners","Limited counter space","Lack of privacy"], allowOther:true}
      ]
    },
    {
      title:"Your Existing Furniture & Belongings",
      intro:["A good design does not necessarily mean replacing everything you already own. I want to understand what should be incorporated into your new design."],
      fields:[
        {key:'ownedItems', type:'multi', label:'Which of the following do you already own?',
          opts:["Sofa/sectional","Coffee table","TV/TV stand","Dining table","Dining chairs","Bed","Nightstands","Dresser","Desk/workspace","Accent chair","Bookshelves/storage","Rugs","Lamps/lighting","Artwork","Mirrors","Decorative objects"], allowOther:true},
        {key:'keepPreference', type:'single', label:'For the furniture and belongings you already own, which best describes your preference?',
          opts:["I want to keep most of what I own","I want to keep some pieces and replace others","I’m open to replacing most things","I’m not sure — I would like recommendations"]},
        {key:'mustKeepPieces', type:'text', label:'Are there any specific pieces you definitely want incorporated into the design?', hint:'Please include sentimental, expensive, inherited, vintage, or otherwise important pieces.'},
        {key:'removePieces', type:'text', label:'Are there any pieces you definitely want to get rid of or replace?'}
      ]
    },
    {
      title:"Your Space & Organization",
      fields:[
        {key:'overallFeel', type:'single', label:'How do you prefer your home to feel?',
          opts:["Minimal and uncluttered","Cozy and layered","Collected and eclectic","Organized but lived-in","Luxurious and polished"], allowOther:true, required:true},
        {key:'clutterSpots', type:'multi', label:'Where does clutter tend to accumulate most often?',
          opts:["Entryway","Kitchen counters","Dining table","Living room","Bedroom","Bathroom","Closet","Desk/workspace"], allowOther:true},
        {key:'storageWishes', type:'multi', label:'What organizational or storage solutions would make your everyday life easier?',
          opts:["Shoe storage","Entryway storage","Hidden storage","Pantry organization","Bathroom storage","Jewelry organization","Charging station"], allowOther:true},
        {key:'outOfPlace', type:'text', label:'Is there anything in your current apartment that constantly feels "out of place" or difficult to organize?'}
      ]
    },
    {
      title:"Your Personal Style",
      fields:[
        {key:'vibe', type:'text', label:'What overall atmosphere or vibe would you like your home to have?', hint:'Describe it in your own words.'},
        {key:'colorsLove', type:'text', label:'Which colors make you feel most comfortable, happy, or inspired?'},
        {key:'colorsAvoid', type:'text', label:'Are there colors you strongly dislike or do not want in your home?'},
        {key:'materials', type:'multi', label:'What materials, fabrics, and textures do you gravitate toward?',
          opts:["Linen","Velvet","Wool","Leather","Cotton","Wood","Stone","Metal","Glass","Bouclé"], allowOther:true},
        {key:'artDecor', type:'text', label:'What types of artwork, objects, or decorative elements resonate with you?'},
        {key:'sentimental', type:'text', label:'Are there any cultural, personal, or sentimental elements you would like your home to reflect?'},
        {key:'styleLove', type:'text', label:'Are there any design styles, furniture styles, or aesthetics that you particularly love or dislike?'}
      ]
    },
    {
      title:"How You Use Each Room — Living Room",
      fields:[
        {key:'livingRoomUse', type:'multi', label:'How do you primarily use your living room?',
          opts:["Watching TV/movies","Relaxing","Reading","Entertaining","Dining","Working","Listening to music"], allowOther:true},
        {key:'hostFrequency', type:'single', label:'How often do you host people at home?', opts:["Rarely","Occasionally","A few times a month","Frequently"]},
        {key:'livingRoomBetter', type:'text', label:'What would you like your living room to do better?'}
      ]
    },
    {
      title:"How You Use Each Room — Bedroom",
      fields:[
        {key:'bedroomUse', type:'multi', label:'How do you primarily use your bedroom?',
          opts:["Sleeping","Reading","Watching TV","Working","Getting dressed","Relaxing"], allowOther:true},
        {key:'bedroomType', type:'single', label:'Do you prefer your bedroom to be:',
          opts:["A sanctuary dedicated primarily to rest","A multifunctional space","Somewhere in between"]},
        {key:'bedroomFeel', type:'text', label:'What would you like to see and feel when you walk into your bedroom?'}
      ]
    },
    {
      title:"How You Use Each Room — Kitchen",
      fields:[
        {key:'cookFrequency', type:'single', label:'How often do you cook at home?', opts:["Daily","Several times per week","Occasionally","Rarely"]},
        {key:'kitchenUse', type:'multi', label:'How do you primarily use your kitchen?',
          opts:["Cooking","Coffee/tea","Eating","Entertaining","Storage","Gathering/socializing"], allowOther:true},
        {key:'kitchenBetter', type:'text', label:'What would make your kitchen more enjoyable or functional?'}
      ]
    },
    {
      title:"How You Use Each Room — Bathroom",
      fields:[
        {key:'bathroomChallenges', type:'text', label:'What are the biggest challenges with your current bathroom?'},
        {key:'bathroomStorageImportance', type:'single', label:'How important are storage and organization in your bathroom?',
          opts:["Not very important","Somewhat important","Very important","Extremely important"]},
        {key:'bathroomWishes', type:'text', label:'Is there anything you wish your bathroom accommodated better?'}
      ]
    },
    {
      title:"How You Use Each Room — Closet",
      fields:[
        {key:'closetChallenges', type:'text', label:'What are the biggest challenges with your current closet?'},
        {key:'closetWishes', type:'multi', label:'What would make your closet easier to use?',
          opts:["More hanging space","Shoe storage","Drawers","Accessory organization","Seasonal storage","Better visibility"], allowOther:true}
      ]
    },
    {
      title:"Budget & Rental-Friendly Design",
      fields:[
        {key:'budget', type:'single', label:'Approximately how much are you comfortable spending on furniture, décor, and improvements for this project?',
          opts:["Under $500","$500–$1,000","$1,000–$2,500","$2,500–$5,000","$5,000+","I’m not sure yet"], required:true},
        {key:'prioritySpend', type:'multi', label:'If you had to prioritize spending, where would you rather invest?', hint:'Select up to 3.',
          opts:["Sofa","Bed/mattress","Dining furniture","Rugs","Lighting","Artwork","Storage/organization","Décor/accessories","Window treatments"], allowOther:true},
        {key:'rentalComfort', type:'single', label:'How comfortable are you making changes to a rental apartment?',
          opts:["I don’t want to make permanent changes","I’m comfortable with removable/renter-friendly changes","I’m comfortable drilling holes or mounting things","I’m comfortable making significant changes with landlord approval"], required:true},
        {key:'diyComfort', type:'single', label:'Are you comfortable assembling furniture or completing simple DIY projects?',
          opts:["Yes","Sometimes","No — I prefer ready-to-use solutions"]},
        {key:'secondhand', type:'single', label:'Are you open to purchasing secondhand, vintage, or antique pieces?',
          opts:["Yes","Maybe, depending on the item","No"], required:true}
      ]
    },
    {
      title:"Your Dream Home",
      fields:[
        {key:'changeOneThing', type:'text', label:'If you could change one thing about your current home, what would it be?'},
        {key:'stayFeatures', type:'text', label:'What features would make you want to stay in your apartment for many years?'},
        {key:'finishedFeeling', type:'text', label:'Imagine walking into your finished apartment six months from now. What would make you think, “This finally feels like me”?'}
      ]
    },
    {
      title:"Photos & Measurements",
      intro:[
        "To create an accurate design concept, it helps to have a few extra details — feel free to send these separately (by email or upload) rather than here.",
        {heading:"Photos — if possible, include:", items:["A photo from each corner of the room","Photos of windows and doors","Photos of existing furniture","Photos of areas that feel problematic","Photos of storage/closets","Photos showing how rooms connect to one another"]},
        {heading:"Floor plan", items:["If your apartment provided you with a floor plan, please have it ready to share."]},
        {heading:"Measurements — if available:", items:["Room length and width","Ceiling height","Window dimensions","Door locations","Major furniture dimensions","Wall sections where furniture/artwork may be placed"]},
        "Don’t worry if you don’t have every measurement. We can work with what you have."
      ],
      fields:[
        {key:'photosNote', type:'text', label:'Anything to note about your photos, floor plan, or measurements?', hint:'Optional.'}
      ]
    },
    {
      title:"Final Question",
      fields:[
        {key:'finalThoughts', type:'text', label:'Is there anything else you think I should know about you, your lifestyle, your apartment, or what you want this space to become?'}
      ]
    }
  ];

  var answers = {};
  var page = 0;
  var pin=document.getElementById('pin');
  var pinColors=['','pine','brass',''];

  var quizEyebrow=document.getElementById('quizEyebrow');
  var sectionTitle=document.getElementById('sectionTitle');
  var fieldsWrap=document.getElementById('fieldsWrap');
  var dotsEl=document.getElementById('dots');
  var backBtn=document.getElementById('backBtn');
  var nextBtn=document.getElementById('nextBtn');

  function renderDots(){
    dotsEl.innerHTML='';
    pages.forEach(function(p,i){
      var d=document.createElement('div');
      d.className='dot'+(i<page?' done':(i===page?' now':''));
      dotsEl.appendChild(d);
    });
  }

  function requiredMet(){
    var p=pages[page];
    return p.fields.every(function(f){
      if(!f.required) return true;
      var v=answers[f.key];
      if(f.type==='multi') return Array.isArray(v) && v.length>0;
      return !!v;
    });
  }

  function renderIntro(container, intro){
    intro.forEach(function(item){
      if(typeof item === 'string'){
        var p=document.createElement('p');
        p.className='page-intro';
        p.textContent=item;
        container.appendChild(p);
      } else {
        var h=document.createElement('p');
        h.className='page-intro page-intro-heading';
        h.textContent=item.heading;
        container.appendChild(h);
        var ul=document.createElement('ul');
        ul.className='page-intro-list';
        item.items.forEach(function(li){
          var el=document.createElement('li');
          el.textContent=li;
          ul.appendChild(el);
        });
        container.appendChild(ul);
      }
    });
  }

  function renderPage(){
    var p=pages[page];
    quizEyebrow.textContent='Section '+(page+1)+' of '+pages.length;
    sectionTitle.textContent=p.title;
    pin.className='pin '+pinColors[page%4];
    fieldsWrap.innerHTML='';

    if(p.intro){ renderIntro(fieldsWrap, p.intro); }

    p.fields.forEach(function(f){
      var wrap=document.createElement('div');
      wrap.className='field';
      var label=document.createElement('label');
      label.textContent=f.label+(f.required?' *':'');
      wrap.appendChild(label);
      var hintText = f.hint || (f.type==='multi' ? 'Select all that apply.' : '');
      if(hintText){
        var h=document.createElement('div'); h.className='hint'; h.textContent=hintText; wrap.appendChild(h);
      }

      if(f.type==='text'){
        var ta=document.createElement('textarea');
        ta.value=answers[f.key]||'';
        ta.addEventListener('input', function(){ answers[f.key]=ta.value; updateNextState(); });
        wrap.appendChild(ta);
      } else if(f.type==='short'){
        var si=document.createElement('input');
        si.type='text';
        si.value=answers[f.key]||'';
        si.addEventListener('input', function(){ answers[f.key]=si.value; updateNextState(); });
        wrap.appendChild(si);
      } else {
        var optsWrap=document.createElement('div');
        optsWrap.className='options';
        var current = answers[f.key] || (f.type==='multi' ? [] : null);
        f.opts.forEach(function(opt){
          var b=document.createElement('button');
          b.type='button';
          b.className='opt'+(f.type==='multi'?' checkbox':'')+(
            f.type==='multi' ? (current.indexOf(opt)>-1?' selected':'') : (current===opt?' selected':'')
          );
          b.textContent=opt;
          b.addEventListener('click', function(){
            if(f.type==='multi'){
              var arr=answers[f.key]||[];
              var idx=arr.indexOf(opt);
              if(idx>-1){ arr.splice(idx,1); } else { arr.push(opt); }
              answers[f.key]=arr;
              b.classList.toggle('selected');
            } else {
              answers[f.key]=opt;
              Array.prototype.forEach.call(optsWrap.children, function(c){ c.classList.remove('selected'); });
              b.classList.add('selected');
            }
            updateNextState();
          });
          optsWrap.appendChild(b);
        });
        wrap.appendChild(optsWrap);

        if(f.allowOther){
          var otherWrap=document.createElement('div');
          otherWrap.className='other-input';
          var oi=document.createElement('input');
          oi.type='text';
          oi.placeholder='Anything else? (optional)';
          oi.value=answers[f.key+'Other']||'';
          oi.addEventListener('input', function(){ answers[f.key+'Other']=oi.value; });
          otherWrap.appendChild(oi);
          wrap.appendChild(otherWrap);
        }
      }
      fieldsWrap.appendChild(wrap);
    });

    updateNextState();
    renderDots();
    backBtn.style.visibility = page===0 ? 'hidden' : 'visible';
  }

  function updateNextState(){
    nextBtn.disabled = !requiredMet();
    nextBtn.textContent = page===pages.length-1 ? 'Build my board' : 'Next';
  }

  nextBtn.addEventListener('click', function(){
    if(page<pages.length-1){ page++; renderPage(); window.scrollTo({top:0,behavior:'smooth'}); }
    else { generateBoard(); }
  });
  backBtn.addEventListener('click', function(){
    if(page>0){ page--; renderPage(); window.scrollTo({top:0,behavior:'smooth'}); }
  });

  // ---------- color helpers ----------
  function safeHex(h, fallback){
    return (typeof h==='string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(h)) ? h : fallback;
  }
  var colorFamilyHex = {
    "Warm neutrals":["#E7D3B0","#B8763F"],
    "Cool neutrals":["#D9D2C4","#3A3835"],
    "Earthy greens":["#7A8C5B","#3F5C46"],
    "Blues & teals":["#8FB3AC","#3F6656"],
    "Blush & dusty pink":["#E8C9C4","#C57C82"],
    "Bold jewel tones":["#8C2E3B","#2E5E4E"],
    "Mustard & warm yellow":["#D9A441","#B8843A"],
    "Monochrome, black & white":["#F1ECDE","#292420"]
  };
  var feelPalettes = {
    "Minimal and uncluttered":["#EDE9E2","#C9C2B4","#7A756A","#3A362F","#B7A98C"],
    "Cozy and layered":["#A9633D","#D9A441","#7A8C5B","#E7D3B0","#4A3728"],
    "Collected and eclectic":["#8C2E3B","#D99A2B","#2E5E4E","#1E1A2E","#E8C9A0"],
    "Organized but lived-in":["#F2EEE5","#D8CFBE","#8E9A8B","#4A4741","#C4A77D"],
    "Luxurious and polished":["#3A3835","#8C837A","#B0492E","#D9D2C4","#1E1C1A"]
  };

  // Q19 ("Which colors make you feel comfortable, happy, or inspired?") is now
  // free text in the source doc, so we scan for color-family keywords instead
  // of relying on checkbox picks.
  var colorKeywordRules = [
    {re:/\b(green|sage|olive|forest|emerald)/i, fam:"Earthy greens"},
    {re:/\b(blue|teal|navy|aqua|turquoise)/i, fam:"Blues & teals"},
    {re:/\b(pink|blush|rose|mauve)/i, fam:"Blush & dusty pink"},
    {re:/\b(jewel|sapphire|rub(y|ies)|burgundy|maroon|wine|plum)/i, fam:"Bold jewel tones"},
    {re:/\b(mustard|yellow|gold|ochre|amber)/i, fam:"Mustard & warm yellow"},
    {re:/\b(monochrome|black\s*(and|&)\s*white)/i, fam:"Monochrome, black & white"},
    {re:/\b(gr[ae]y|charcoal|black|white|ivory)/i, fam:"Cool neutrals"},
    {re:/\b(cream|tan|terracotta|beige|camel|sand|warm neutral)/i, fam:"Warm neutrals"}
  ];
  function matchColorFamilies(text){
    if(!text) return [];
    var matches=[];
    colorKeywordRules.forEach(function(r){
      if(r.re.test(text) && matches.indexOf(r.fam)===-1) matches.push(r.fam);
    });
    return matches;
  }

  function pickPalette(){
    var families = matchColorFamilies(answers.colorsLove);
    if(families.length){
      var picked=[];
      families.forEach(function(fam){ (colorFamilyHex[fam]||[]).forEach(function(h){ picked.push(h); }); });
      while(picked.length<5){ picked=picked.concat(feelPalettes[answers.overallFeel]||feelPalettes["Cozy and layered"]); }
      return picked.slice(0,5);
    }
    return feelPalettes[answers.overallFeel] || feelPalettes["Cozy and layered"];
  }

  // ---------- texture rendering (from user's own material picks) ----------
  var textureCss = {
    "Linen":'repeating-linear-gradient(90deg, #EDE7D8 0 2px, #E2DAC5 2px 4px), repeating-linear-gradient(0deg, rgba(120,95,55,0.05) 0 2px, transparent 2px 4px)',
    "Velvet":'linear-gradient(100deg, rgba(255,255,255,0.10), transparent 30%), repeating-linear-gradient(100deg, rgba(0,0,0,0.06) 0 3px, transparent 3px 6px), #6E2233',
    "Wool":'radial-gradient(rgba(255,255,255,0.5) 1.2px, transparent 1.8px), radial-gradient(rgba(0,0,0,0.06) 1.2px, transparent 1.8px), #E4D9C2',
    "Leather":'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.18), transparent 45%), #8A5A34',
    "Cotton":'repeating-linear-gradient(90deg, #F1ECDE 0 2px, #E9E1CC 2px 3px), repeating-linear-gradient(0deg, #F1ECDE 0 2px, #E9E1CC 2px 3px)',
    "Wood":'repeating-linear-gradient(90deg, #A9713F 0 6px, #8F5C31 6px 8px, #B27E49 8px 14px)',
    "Stone":'radial-gradient(circle at 25% 30%, rgba(255,255,255,0.18), transparent 35%), radial-gradient(circle at 65% 65%, rgba(0,0,0,0.10), transparent 40%), #ACA79C',
    "Metal":'repeating-linear-gradient(115deg, #DADADA 0 2px, #B9B9B9 2px 4px)',
    "Glass":'linear-gradient(120deg, rgba(255,255,255,0.7), rgba(200,220,220,0.25) 40%, rgba(255,255,255,0.55) 60%, rgba(200,220,220,0.2)), #DCE7E6',
    "Bouclé":'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1.6px), radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1.6px), #E4DCC8'
  };

  // ---------- furniture icons (fixed categories) ----------
  // Several areas can be selected (Q6); we visualize a bedroom scene only
  // when Bedroom is picked and the broader living/whole-apartment areas aren't.
  var isBed = function(){
    var f = answers.focusArea || [];
    return f.indexOf('Bedroom') > -1 && f.indexOf('Living room') === -1 && f.indexOf('Entire apartment') === -1;
  };

  function icon(key, c1, c2){
    c1=safeHex(c1,'#8C7A5A'); c2=safeHex(c2,'#292420');
    switch(key){
      case 'seating':
        return isBed()
          ? '<svg viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="18" rx="3" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><rect x="10" y="10" width="10" height="10" rx="2" fill="#fff" stroke="'+c2+'" stroke-width="1.5"/><rect x="6" y="30" width="36" height="6" rx="2" fill="'+c2+'" opacity="0.15"/></svg>'
          : '<svg viewBox="0 0 48 48"><rect x="7" y="18" width="34" height="14" rx="4" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><rect x="7" y="26" width="34" height="8" rx="3" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><rect x="6" y="14" width="6" height="18" rx="2" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><rect x="36" y="14" width="6" height="18" rx="2" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/></svg>';
      case 'rug':
        return '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="19" ry="12" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><ellipse cx="24" cy="24" rx="12" ry="7" fill="none" stroke="'+c2+'" stroke-width="1" opacity="0.4"/></svg>';
      case 'lighting':
        return '<svg viewBox="0 0 48 48"><line x1="24" y1="42" x2="24" y2="22" stroke="'+c2+'" stroke-width="1.5"/><path d="M15 22 L33 22 L29 8 L19 8 Z" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><rect x="16" y="42" width="16" height="3" rx="1.5" fill="'+c2+'" opacity="0.25"/></svg>';
      case 'table':
        return '<svg viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="5" rx="1.5" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><line x1="12" y1="21" x2="12" y2="38" stroke="'+c2+'" stroke-width="2"/><line x1="36" y1="21" x2="36" y2="38" stroke="'+c2+'" stroke-width="2"/></svg>';
      case 'storage':
        return '<svg viewBox="0 0 48 48"><rect x="9" y="9" width="30" height="30" rx="2" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><line x1="9" y1="20" x2="39" y2="20" stroke="'+c2+'" stroke-width="1.2"/><line x1="9" y1="30" x2="39" y2="30" stroke="'+c2+'" stroke-width="1.2"/><circle cx="24" cy="15" r="1.4" fill="'+c2+'"/><circle cx="24" cy="25" r="1.4" fill="'+c2+'"/></svg>';
      case 'wallArt':
        return '<svg viewBox="0 0 48 48"><rect x="9" y="8" width="30" height="26" rx="1.5" fill="#fff" stroke="'+c2+'" stroke-width="1.5"/><path d="M13 28 L20 18 L26 24 L31 14 L35 28 Z" fill="'+c1+'" opacity="0.85"/></svg>';
      default: return '';
    }
  }

  var furnitureTemplates = {
    "Minimal and uncluttered":{ seatingNote:"one clean-lined piece, no ornate details", rugNote:"low-pile, solid or subtle texture", lightingNote:"a single sculptural floor or arc lamp", tableNote:"simple geometric shape, one material", storageNote:"closed storage — no visible clutter", wallArtNote:"one large piece rather than a gallery wall" },
    "Cozy and layered":{ seatingNote:"deep and soft, room to sink in", rugNote:"a textured wool or wool-blend layer", lightingNote:"warm, low lighting — a table lamp over an overhead", tableNote:"warm wood, rounded edges", storageNote:"open shelving to display favorite things", wallArtNote:"a mix of framed pieces and textiles" },
    "Collected and eclectic":{ seatingNote:"something with character — vintage shape or bold color", rugNote:"pattern-forward, layered over a plainer base rug", lightingNote:"a statement lamp as a conversation piece", tableNote:"vintage or unique silhouette", storageNote:"an interesting cabinet, not just a box", wallArtNote:"a full gallery wall, mixed frames and eras" },
    "Organized but lived-in":{ seatingNote:"comfortable but tidy — track arms, defined cushions", rugNote:"durable, easy to keep clean", lightingNote:"layered lighting: overhead plus one accent", tableNote:"with a drawer or shelf for hidden storage", storageNote:"labeled, modular storage that scales", wallArtNote:"a few well-placed pieces, evenly spaced" },
    "Luxurious and polished":{ seatingNote:"tailored upholstery, structured silhouette", rugNote:"a plush, high-pile rug in a rich tone", lightingNote:"a statement fixture with metal or glass detail", tableNote:"stone top or high-gloss finish", storageNote:"a fitted, furniture-grade storage piece", wallArtNote:"one museum-quality framed piece, well lit" }
  };
  function pickFurniture(){
    var t = furnitureTemplates[answers.overallFeel] || furnitureTemplates["Cozy and layered"];
    var seatWord = isBed() ? "Bed" : "Sofa";
    return {
      seating:{name:seatWord, note:"Look for " + t.seatingNote + "."},
      rug:{name:"Rug", note:"Go with " + t.rugNote + "."},
      lighting:{name:"Lighting", note:"Add " + t.lightingNote + "."},
      table:{name: isBed() ? "Nightstand" : "Coffee table", note:"Pick one " + t.tableNote + "."},
      storage:{name:"Storage", note:"Use " + t.storageNote + "."},
      wallArt:{name:"Wall art", note:"Try " + t.wallArtNote + "."}
    };
  }

  function sentence(text){
    if(!text) return '';
    var t = text.trim();
    return /[.!?]$/.test(t) ? t : t + '.';
  }

  function buildBoard(){
    var palette = pickPalette();
    var areas = (answers.focusArea || []).filter(function(a){ return a; });
    var styleName = (answers.overallFeel || "Your style") + (areas.length ? " · " + areas.join(', ') : "");

    var briefBits = [];
    if(answers.vibe) briefBits.push(sentence(answers.vibe));
    if(answers.moodWords && answers.moodWords.length) briefBits.push("You want the space to feel " + answers.moodWords.join(', ').toLowerCase() + ".");
    if(answers.wishChange) briefBits.push("First on your list: " + sentence(answers.wishChange));
    var brief = briefBits.length ? briefBits.join(' ') : "Here's a starting point based on your answers — refine as you go.";

    var tips = [];
    if(answers.wishChange) tips.push("Address first: " + sentence(answers.wishChange));
    if(answers.mustSupport) tips.push("Keep this top of mind: " + sentence(answers.mustSupport));
    (answers.challenges||[]).slice(0,2).forEach(function(c){ tips.push("Tackle the " + c.toLowerCase() + " issue early — it shapes everything else."); });
    if(tips.length===0) tips.push("Start with one anchor piece for the " + (areas[0]||"room") + " and build outward.");

    var mantra = "Make it work for how you actually live, then make it beautiful.";
    if(answers.finishedFeeling && answers.finishedFeeling.trim().length<=160) mantra = answers.finishedFeeling.trim();

    return {
      styleName: styleName, palette: palette, brief: brief, tips: tips.slice(0,5),
      mantra: mantra, furniture: pickFurniture()
    };
  }

  var rentalTipPool = {
    "I don’t want to make permanent changes":["Rely on removable hooks, tension rods, and freestanding storage.","Use large rugs and furniture placement to define zones instead of paint."],
    "I’m comfortable with removable/renter-friendly changes":["Use removable adhesive strips and hooks instead of nails.","Lean large art or a mirror against the wall instead of hanging it."],
    "I’m comfortable drilling holes or mounting things":["Anchor shelving properly — it opens up storage removable options can't.","A gallery wall of hung art reads more intentional than leaned pieces."],
    "I’m comfortable making significant changes with landlord approval":["Ask about approved paint or fixture changes — a single accent wall goes a long way.","Consider peel-and-stick or approved wallpaper for one feature wall."]
  };
  var budgetTipPool = {
    "Under $500":["Prioritize one anchor piece; thrift or DIY the rest.","Textiles (pillows, a throw, curtains) change a room fastest for the least money."],
    "$500–$1,000":["Split the budget: one investment piece, the rest thrifted or budget-new.","Save receipts — small swaps (hardware, lighting) add up to a big shift."],
    "$1,000–$2,500":["Invest in the piece you touch most — bed, sofa, or desk chair.","Mix one or two new pieces with secondhand finds for the rest."],
    "$2,500–$5,000":["This covers a real furniture refresh — prioritize durability on daily-use pieces.","Consider a designer or vintage piece as the room's focal point."],
    "$5,000+":["You can fully outfit the space — sequence purchases by room priority.","Custom or made-to-order pieces (rugs, drapery) become realistic at this range."],
    "I’m not sure yet":["Start with the cheapest high-impact changes (textiles, lighting, art) while you plan.","Price out your top 3 wish-list items before committing to a full budget."]
  };

  // ---------- room mockup SVG ----------
  function roomSVG(palette){
    var wall = safeHex(palette[3], '#D8CFBE');
    var main = safeHex(palette[0], '#A9633D');
    var rug  = safeHex(palette[1], '#D9A441');
    var accent = safeHex(palette[2], '#7A8C5B');
    var ink = '#292420';
    var floor = '#C9A876';

    var common =
      '<rect x="0" y="0" width="400" height="170" fill="'+wall+'"/>' +
      '<rect x="0" y="170" width="400" height="90" fill="'+floor+'"/>' +
      '<rect x="0" y="170" width="400" height="90" fill="'+ink+'" opacity="0.05"/>' +
      '<rect x="290" y="24" width="80" height="80" rx="2" fill="#EAE3D2" stroke="'+ink+'" stroke-width="2"/>' +
      '<line x1="330" y1="24" x2="330" y2="104" stroke="'+ink+'" stroke-width="1.5"/>' +
      '<line x1="290" y1="64" x2="370" y2="64" stroke="'+ink+'" stroke-width="1.5"/>' +
      '<path d="M20 205 Q20 175 34 172 Q40 178 34 186 Q46 186 46 200 Q46 210 34 212 L20 212 Z" fill="'+accent+'" stroke="'+ink+'" stroke-width="1.5"/>' +
      '<rect x="14" y="210" width="26" height="8" rx="1.5" fill="#8A5A34" stroke="'+ink+'" stroke-width="1.5"/>';

    var scene;
    if(isBed()){
      scene =
        '<rect x="120" y="60" width="140" height="40" rx="3" fill="#fff" stroke="'+ink+'" stroke-width="2"/>' +
        '<rect x="130" y="66" width="34" height="26" rx="4" fill="'+accent+'" opacity="0.5" stroke="'+ink+'" stroke-width="1.2"/>' +
        '<rect x="168" y="66" width="34" height="26" rx="4" fill="'+accent+'" opacity="0.5" stroke="'+ink+'" stroke-width="1.2"/>' +
        '<ellipse cx="180" cy="210" rx="95" ry="32" fill="'+rug+'" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<rect x="90" y="98" width="150" height="72" rx="4" fill="'+main+'" stroke="'+ink+'" stroke-width="2"/>' +
        '<rect x="235" y="128" width="34" height="42" rx="3" fill="#B98A55" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<circle cx="252" cy="118" r="9" fill="'+accent+'" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<rect x="140" y="20" width="80" height="34" rx="1.5" fill="#fff" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<path d="M146 46 L166 28 L180 40 L200 24 L214 46 Z" fill="'+accent+'" opacity="0.85"/>';
    } else {
      scene =
        '<ellipse cx="170" cy="215" rx="105" ry="30" fill="'+rug+'" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<rect x="70" y="140" width="180" height="46" rx="10" fill="'+main+'" stroke="'+ink+'" stroke-width="2"/>' +
        '<rect x="70" y="168" width="180" height="24" rx="8" fill="'+main+'" stroke="'+ink+'" stroke-width="2"/>' +
        '<rect x="62" y="130" width="20" height="56" rx="6" fill="'+main+'" stroke="'+ink+'" stroke-width="2"/>' +
        '<rect x="238" y="130" width="20" height="56" rx="6" fill="'+main+'" stroke="'+ink+'" stroke-width="2"/>' +
        '<rect x="120" y="208" width="80" height="10" rx="2" fill="#B98A55" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<line x1="130" y1="218" x2="130" y2="232" stroke="'+ink+'" stroke-width="2"/>' +
        '<line x1="190" y1="218" x2="190" y2="232" stroke="'+ink+'" stroke-width="2"/>' +
        '<rect x="128" y="16" width="70" height="46" rx="1.5" fill="#fff" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<path d="M134 52 L152 30 L166 42 L184 20 L194 52 Z" fill="'+accent+'" opacity="0.85"/>' +
        '<line x1="252" y1="180" x2="252" y2="130" stroke="'+ink+'" stroke-width="1.5"/>' +
        '<path d="M240 130 L264 130 L258 112 L246 112 Z" fill="'+accent+'" stroke="'+ink+'" stroke-width="1.5"/>';
    }

    return '<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">' + common + scene + '</svg>';
  }

  function generateBoard(){
    document.getElementById('quiz').style.display='none';
    document.getElementById('loading').style.display='block';
    window.scrollTo({top:0,behavior:'smooth'});

    // A short delay makes the transition feel intentional rather than instant.
    setTimeout(function(){
      renderResult(buildBoard());
    }, 650);
  }

  function renderResult(data){
    document.getElementById('loading').style.display='none';
    document.getElementById('result').style.display='block';

    document.getElementById('resultTitle').textContent = data.styleName || 'Your board';
    document.getElementById('resultBrief').textContent = data.brief || '';

    var palette = (data.palette||[]).map(function(h,i){ return safeHex(h, feelPalettes["Cozy and layered"][i]); });
    while(palette.length<5) palette.push(feelPalettes["Cozy and layered"][palette.length]);

    document.getElementById('roomSvgWrap').innerHTML = roomSVG(palette);

    var sw=document.getElementById('swatches'), lb=document.getElementById('swatchLabels');
    sw.innerHTML=''; lb.innerHTML='';
    palette.forEach(function(hex){
      var d=document.createElement('div'); d.className='swatch'; d.style.background=hex; sw.appendChild(d);
      var s=document.createElement('span'); s.textContent=hex.toUpperCase(); lb.appendChild(s);
    });

    var tx=document.getElementById('textures');
    tx.innerHTML='';
    var chosenMaterials = answers.materials && answers.materials.length ? answers.materials : ["Linen","Wood","Wool"];
    chosenMaterials.forEach(function(m){
      var wrap=document.createElement('div'); wrap.className='texture-chip';
      var patch=document.createElement('div'); patch.className='swatch-patch';
      patch.style.backgroundImage = textureCss[m] || textureCss["Linen"];
      var label=document.createElement('span'); label.textContent=m;
      wrap.appendChild(patch); wrap.appendChild(label);
      tx.appendChild(wrap);
    });

    var furnGrid=document.getElementById('furnGrid');
    furnGrid.innerHTML='';
    var order=['seating','rug','lighting','table','storage','wallArt'];
    order.forEach(function(key){
      var f = (data.furniture && data.furniture[key]) || pickFurniture()[key];
      var card=document.createElement('div'); card.className='furn-card';
      card.innerHTML = icon(key, palette[0], '#292420');
      var nameEl=document.createElement('div'); nameEl.className='furn-name'; nameEl.textContent=f.name;
      var noteEl=document.createElement('div'); noteEl.className='furn-note'; noteEl.textContent=f.note;
      card.appendChild(nameEl); card.appendChild(noteEl);
      furnGrid.appendChild(card);
    });

    var tipsList=document.getElementById('tipsList');
    tipsList.innerHTML='';
    (data.tips||[]).forEach(function(t){ var li=document.createElement('li'); li.textContent=t; tipsList.appendChild(li); });

    document.getElementById('mantraText').textContent = '“' + (data.mantra||'') + '”';

    var rentalHacks=document.getElementById('rentalHacks');
    rentalHacks.innerHTML='';
    (rentalTipPool[answers.rentalComfort]||[]).forEach(function(t){ var li=document.createElement('li'); li.textContent=t; rentalHacks.appendChild(li); });

    var budgetHacks=document.getElementById('budgetHacks');
    budgetHacks.innerHTML='';
    (budgetTipPool[answers.budget]||[]).forEach(function(t){ var li=document.createElement('li'); li.textContent=t; budgetHacks.appendChild(li); });
  }

  document.getElementById('restartBtn').addEventListener('click', function(){
    answers={}; page=0;
    document.getElementById('result').style.display='none';
    document.getElementById('quiz').style.display='block';
    renderPage();
    window.scrollTo({top:0,behavior:'smooth'});
  });

  renderPage();
})();
