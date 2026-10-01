const fs = require('fs');
let file = fs.readFileSync('src/components/ProjectStory.tsx', 'utf8');

// 1. Replace idea disciplines (chips)
file = file.replace(
    /<div className="idea-disciplines mono"><span>◆ Senior Art<\/span><span>◆ Composition<\/span><span>◆ Storytelling<\/span><\/div>/,
    `<div className="idea-disciplines mono"><span>◆ {isVi && project.role_vi ? project.role_vi : project.role}</span><span>◆ {project.client}</span><span>◆ {project.year}</span></div>`
);

// 2. Replace closing sentence
file = file.replace(
    /<h2>\{isVi \? 'Chi tiết' : 'The work.'\}<br \/>\{isVi \? 'tác phẩm.' : 'In full.'\}<\/h2>/,
    `<h2>{(isVi && project.closing_vi ? project.closing_vi : project.closing)[0]}<br />{(isVi && project.closing_vi ? project.closing_vi : project.closing)[1]}</h2>`
);

// 3. Add impact to outcome
file = file.replace(
    /<h2>\{isVi && project.outcome_vi \? project.outcome_vi : project.outcome\}<\/h2><\/Reveal>/,
    `<h2>{isVi && project.outcome_vi ? project.outcome_vi : project.outcome}</h2></Reveal><Reveal delay={.12}><p className="large-copy impact-text">{isVi && project.impact_vi ? project.impact_vi : project.impact}</p></Reveal>`
);

fs.writeFileSync('src/components/ProjectStory.tsx', file);
