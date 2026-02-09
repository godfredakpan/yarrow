/**
 * Health information topics for the right-side guided info panel.
 * Slug is used in URL: /info/:slug
 */
export interface HealthTopic {
  slug: string;
  title: string;
  summary: string;
  content: string;
}

export const healthTopics: HealthTopic[] = [
  {
    slug: "what-is-a-period",
    title: "What is a Period",
    summary:
      "Menstruation (a period) is normal vaginal bleeding that happens as part of a monthly cycle when the womb sheds its lining if pregnancy does not happen.",
    content: `**What is a period?**
Menstruation, often called a period, is normal vaginal bleeding that happens as part of a girl's or woman's monthly cycle. Every month, the body prepares for pregnancy. If pregnancy does not happen, the womb (uterus) sheds its lining. This lining leaves the body as menstrual blood, which is made up of blood and tissue from inside the uterus.

Periods can start as early as age 9 and usually continue until menopause, around age 51. Most periods last about 3–5 days, but some may last up to 7 days.

Many girls get their first period around age 11, but it can start earlier or later. Everyone’s body is different, and each person develops on their own schedule.

It can feel a bit shy or awkward to talk about periods, especially in some families. Even so, it’s important to tell at least one trusted adult, such as a parent or caregiver. If siblings tease you, you can simply let them know it means you’re growing older.

**Why do girls get periods?**
Periods happen because of hormone changes in the body. These hormones tell the uterus to prepare for pregnancy by building up its lining, which is where a fertilised egg could grow into a baby.

If pregnancy doesn’t happen, the lining breaks down and leaves the body as menstrual bleeding. This process repeats each month, which is why most girls and women have periods about once a month.

**How often do periods happen?**
Most periods happen once a month. During the first few years after a girl starts menstruating, periods may not be regular — and that’s completely normal.

By about three years after the first period, many cycles settle into a more regular monthly pattern.

**How long do periods last?**
Periods usually last between 3 and 5 days, though some may last a bit longer.

**How much blood comes out?**
It can look like a lot of blood, but most girls only lose a few tablespoons over the entire period.

**Final thoughts**
Periods are a natural and healthy part of life. They should not stop you from having fun, going to school, or enjoying everyday activities.

If you have questions about your period, talk to a doctor, nurse, parent, or trusted family member. You can also reach out to the Yarrow team with questions.`,
  },
  {
    slug: "contraceptives",
    title: "Contraceptives",
    summary:
      "Methods used to prevent pregnancy. Some also help with period symptoms or other health needs.",
    content: `Contraceptives are methods used to prevent pregnancy. Some also help with period symptoms or other health needs.

**Types**
- **Barrier:** Condoms (internal and external), diaphragms
- **Hormonal:** Pills, patch, ring, injection, implant, hormonal IUD
- **Long-acting:** Copper IUD, hormonal IUD, implant
- **Natural:** Tracking fertility (less effective; requires consistency)

**Choosing a method**
Consider: effectiveness, side effects, how often you want to use it, cost, and whether you want to preserve fertility soon or later. A healthcare provider can help you compare options.

**Where to get them**
Available from clinics, some pharmacies, and community health services. Many methods need a prescription or fitting.`,
  },
  {
    slug: "pcos",
    title: "PCOS",
    summary:
      "Polycystic ovary syndrome affects the ovaries and hormone balance. Common signs include irregular periods and excess hair growth.",
    content: `PCOS (polycystic ovary syndrome) is a common condition that affects the ovaries and hormone balance.

**What is it?**
People with PCOS may have irregular or fewer periods, higher levels of androgens (male-type hormones), and sometimes many small follicles on the ovaries (often called “cysts” on ultrasound).

**Common signs**
- Irregular or missed periods
- Excess hair growth (face, body)
- Acne or oily skin
- Weight changes
- Difficulty getting pregnant (for some)

**Management**
There’s no cure, but symptoms can be managed with lifestyle changes, medication (e.g. for cycles, insulin resistance, or hair growth), and support from a healthcare provider.

**Why it matters**
PCOS can increase the chance of conditions like type 2 diabetes or heart disease later. Early diagnosis and care can help.`,
  },
  {
    slug: "endometriosis",
    title: "Endometriosis",
    summary:
      "Tissue similar to the uterine lining grows outside the uterus, causing pain and inflammation. Symptoms include painful periods and pelvic pain.",
    content: `Endometriosis is when tissue similar to the lining of the uterus grows outside the uterus (e.g. on ovaries, bowel, or pelvic wall).

**What happens**
This tissue still responds to hormones and can bleed and cause inflammation, pain, and scarring.

**Common symptoms**
- Painful periods
- Pain during sex or when using the toilet
- Long-term pelvic or lower back pain
- Bleeding between periods
- Difficulty getting pregnant (for some)

**Diagnosis**
Diagnosis can take time. It may involve a detailed history, examination, imaging, and sometimes surgery (laparoscopy) to confirm.

**Management**
Treatment depends on symptoms and goals (e.g. pain relief, preserving fertility). Options include pain relief, hormonal treatments, and surgery. A specialist can help plan care.`,
  },
  {
    slug: "menstrual-cycles",
    title: "Menstrual Cycles",
    summary:
      "The monthly process that prepares the body for pregnancy. Phases include menstruation, follicular, ovulation, and luteal.",
    content: `The menstrual cycle is the monthly process that prepares the body for a possible pregnancy. It involves the brain, ovaries, and uterus.

**Phases**
- **Menstruation:** The period; lining of the uterus is shed (days 1–5 often).
- **Follicular:** Follicles in the ovary develop; one usually becomes the dominant egg (roughly days 1–14).
- **Ovulation:** An egg is released (around mid-cycle).
- **Luteal:** The uterus lining thickens; if the egg isn’t fertilized, the cycle ends with the next period (often 14 days before the next period).

**Cycle length**
A “cycle” is from day 1 of one period to day 1 of the next. Many people have cycles between 21 and 35 days; length can vary.

**Tracking**
Tracking periods and symptoms (e.g. in an app or calendar) can help you understand your pattern and talk to a provider if something changes.`,
  },
  {
    slug: "menstrual-cramps",
    title: "Menstrual Cramps",
    summary:
      "Pain in the lower belly or back around your period. Often manageable with self-care; severe pain may need a healthcare provider.",
    content: `Menstrual cramps (dysmenorrhea) are pain or discomfort in the lower belly or back that many people get before or during their period. For most, cramps are mild to moderate and ease after a few days.

**Why do they happen?**
The uterus contracts to help shed its lining. Hormone-like substances called prostaglandins trigger these contractions. Higher levels can mean stronger cramps.

**What helps**
- **Heat:** A warm bath or a hot water bottle on your lower belly can relax muscles and ease pain.
- **Movement:** Light exercise (e.g. walking, stretching) can improve blood flow and reduce discomfort.
- **Over-the-counter pain relief:** Ibuprofen or naproxen, taken at the start of pain (with food), can reduce cramps. Paracetamol may also help. Always follow the packet and ask a pharmacist if unsure.
- **Rest:** Enough sleep and reducing stress can help.

**When to see a provider**
See a doctor or nurse if cramps are severe, last many days, don’t improve with simple measures, or affect school, work, or daily life. Very heavy bleeding, pain at other times in the cycle, or new or worsening symptoms also warrant a check-up. They can rule out causes like endometriosis or fibroids and suggest further treatment.`,
  },
  {
    slug: "menstrual-cups-and-discs",
    title: "Menstrual Cups and Discs",
    summary:
      "Reusable period products worn inside the body. Cups sit in the vagina; discs sit at the cervix. Both collect flow rather than absorb it.",
    content: `Menstrual cups and menstrual discs are reusable period products worn inside the body. They collect menstrual flow instead of absorbing it, and can be a comfortable, eco-friendly option for many people.

**Menstrual cups**
A menstrual cup is a flexible, bell-shaped cup (usually silicone) that you fold and insert into the vagina. It sits below the cervix and collects blood. You remove it every 4–12 hours (depending on flow), empty it, rinse or wipe it, and reinsert. Most cups are reusable for several years if cared for as directed.

**Menstrual discs**
A menstrual disc is a flexible ring with a shallow bowl that sits at the cervix (higher than a cup). It also collects flow. Some discs are reusable; others are single-use. Like cups, they can be worn for several hours before emptying. Some people find discs comfortable for sex (depending on the product and preference).

**Choosing and using**
- **Size:** Cups and discs come in different sizes (often related to age, flow, or birth history). Check the product guide.
- **Insertion and removal:** Follow the instructions that come with the product. Wash your hands before and after. Empty and rinse at least every 12 hours; sterilise reusable ones between cycles as directed.
- **Comfort:** If something feels pinchy or leaks, try a different size or shape, or check placement. A clinician or a trusted resource can help with fit.

**Benefits**
Reusable cups and discs can reduce waste and cost over time. Many people find they can swim, exercise, and sleep with them in place once they’re used to them.

**Safety**
Use only products meant for menstrual use and follow the manufacturer’s instructions. If you have an IUD, check with your provider about cup use; some advise care with the suction on removal. If you have pain, unusual discharge, or irritation, stop use and speak to a healthcare provider.`,
  },
];

export const healthTopicSlugs = healthTopics.map((t) => t.slug);

export function getTopicBySlug(slug: string): HealthTopic | undefined {
  return healthTopics.find((t) => t.slug === slug);
}

export function getPrevNextSlug(slug: string): { prev: string | null; next: string | null } {
  const i = healthTopics.findIndex((t) => t.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? healthTopics[i - 1].slug : null,
    next: i < healthTopics.length - 1 ? healthTopics[i + 1].slug : null,
  };
}
