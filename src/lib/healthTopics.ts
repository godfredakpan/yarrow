/**
 * Health information topics — content from public/docs PDFs only.
 * summary = first 100 words from the doc (sidebar); content = full doc (info page).
 */
export interface HealthTopic {
  slug: string;
  title: string;
  summary: string;
  content: string;
}

function first100Words(text: string): string {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  return words.slice(0, 100).join(" ");
}

// ─── What Is a Period (from What Is a Period.pdf) ─────────────────────────────
const whatIsAPeriodFull = `

**Menstruation**, often called a period, is normal vaginal bleeding that happens as part of a girl or woman's monthly cycle. The beginning of a period marks the start of a young girl's menstrual journey and is often seen as an important step in growing up.

Every month, the body prepares for pregnancy. If pregnancy does not happen, the womb (uterus) sheds its lining. This lining leaves the body as menstrual blood, which is made up of blood and tissue from inside the uterus.

Periods can start as early as age 9 and usually continue until menopause, around age 51. Most periods last about 3 to 5 days, but some may last up to 7 days.

Many girls get their first period around age 11, but it can start earlier or later. Everyone's body is different, and each person develops on their own schedule.

It's normal to feel a little shy about sharing this news. In some families, it can feel hard to talk about body changes. Even so, it's important to tell at least one trusted adult, such as a parent or caregiver. If siblings find out and tease you, you can simply let them know it means you're growing older.

**Why Do Girls Get Periods?**

Periods happen because of hormone changes in the body. These hormones tell the uterus to prepare for pregnancy by building up its lining. This lining is where a fertilized egg could grow into a baby.

If pregnancy doesn't happen, the lining breaks down and leaves the body as menstrual bleeding. This process repeats each month, which is why most girls and women have periods about once a month.

**How Often Do Periods Happen?**

Most periods happen once a month. During the first few years after a girl starts menstruating, periods may not be regular—and that's completely normal.

By about three years after the first period, most girls' cycles settle into a more regular monthly pattern.

**How Long Do Periods Last?**

Periods usually last between 3 and 5 days, though some may last a bit longer.

**How Much Blood Comes Out During a Period?**

It may look like a lot of blood, but most girls only lose a few tablespoons of blood over the entire period.

**Final Thoughts**

Periods are a natural and healthy part of life. They should not stop you from having fun, going to school, or enjoying everyday activities.

If you have questions about your period, talk to a doctor, nurse, parent, or trusted family member.

For more information, contact us at hello@yarrowcare.org.`;

// ─── Menstrual Cramps (from Menstrual Cramps.pdf) ───────────────────────────
const menstrualCrampsFull = `**Menstrual cramps**, also called dysmenorrhea, are throbbing or cramping pains in the lower abdomen that often occur just before or during a menstrual period. They may also be accompanied by lower back pain, nausea, headaches, or fatigue. Many girls and women experience menstrual cramps at some point in their lives.

For some, the discomfort is mild and manageable. For others, cramps can be severe enough to interfere with daily activities for several days each month.

**Why Are Menstrual Cramps Painful?**

During your menstrual period, the womb (uterus) contracts to help shed its lining. These contractions are triggered by hormone-like substances called prostaglandins, which are involved in pain and inflammation.

Higher levels of prostaglandins are linked to stronger uterine contractions and more severe cramps.

**Types of Menstrual Cramps**

There are two main types of menstrual cramps:

**Primary Dysmenorrhea**
• Common menstrual cramps not caused by another medical condition
• Usually begin during the teenage years
• Often improve with age or after childbirth

**Secondary Dysmenorrhea**
• Caused by an underlying medical condition, such as:
  • Endometriosis
  • Uterine fibroids
  • Polycystic Ovary Syndrome (PCOS)
  • Pelvic Inflammatory Disease (PID)
• Pain may worsen over time and last longer than a typical period

**Symptoms of Menstrual Cramps**

• Throbbing or cramping pain in the lower abdomen
• Pain in the lower back or thighs
• Nausea or fatigue
• Diarrhea
• Dizziness

**Treatment Options**

**Lifestyle Changes**
• Regular exercise
• Stress-reduction techniques such as relaxation or stretching

**Heat Therapy**
• Applying a warm towel or hot water bottle to the abdomen can help relax the muscles and reduce pain

**Medication**
• Over-the-counter pain relievers such as ibuprofen or naproxen
• These are most effective when started 1–2 days before your period begins

**When to Seek Medical Help**

You should talk to a healthcare provider if:
• Pain does not improve with medication or self-care
• Cramps interfere with school, work, or daily life
• Your cramps suddenly become much worse
• You are over age 25 and experience severe cramps for the first time
• You have a fever along with period pain
• You have pelvic pain even when you are not on your period

**Treatments for Severe Menstrual Pain**

If your pain is caused by primary dysmenorrhea and requires medical treatment, hormonal birth control (such as the pill, patch, ring, or IUD) may help reduce or prevent cramps.

Always consult a healthcare provider to determine the best treatment option for you.

For more information, contact us at hello@yarrowcare.org.`;

// ─── Menstrual Cups and Discs (from Menstrual Cups and Discs.pdf) ─────────────
const menstrualCupsAndDiscsFull = `

Menstrual cups and menstrual discs are reusable period products that collect menstrual blood instead of absorbing it like pads or tampons. They are worn inside the body and can be a comfortable, effective option for many people.

**What's the Difference?**

• Menstrual cups sit in the vaginal canal and form a gentle seal to collect blood.
• Menstrual discs sit higher, at the base of the cervix, and collect blood without forming a seal.

Both come in different sizes to fit different bodies and flow levels.

**Benefits of Cups and Discs**

• Can be worn for up to 8–12 hours, depending on flow
• Reusable and environmentally friendly
• May be more cost-effective over time
• Do not dry out the body like some tampons can

(Always follow product instructions.)

**Are They Safe?**

Yes. When used as directed and cleaned properly, menstrual cups and discs are considered safe. As with any menstrual product, good hand hygiene and routine cleaning are important.

They may take some time to get used to, and that's okay. Everyone's comfort level is different.

**Who Might Consider Them?**

Menstrual cups and discs can be an option for teens and adults who:
• Want longer-lasting protection
• Are comfortable learning to use an internal product
• Are looking for reusable menstrual options

They are not required—pads, tampons, cups, and discs are all valid choices.

**When to Ask for Help**

A healthcare provider can help answer questions about:
• Choosing the right size or type
• Comfort or insertion concerns
• Whether a cup or disc is a good option for you

**Final Message**

Menstrual cups and discs are just one of many healthy period care options. The best choice is the one that feels safe, comfortable, and practical for each individual.

For questions or support, contact a trusted healthcare provider.

For more information, contact us at hello@yarrowcare.org.`;

// ─── PCOS (from PCOS.pdf) ─────────────────────────────────────────────────────
const pcosFull = `

PCOS is a common hormone condition that affects women during their reproductive years. It happens when the body makes higherthannormal levels of certain hormones called androgens. This can cause irregular periods, acne, weight gain, extra hair growth, and trouble getting pregnant.

Even though the name includes the word “cyst,” not everyone with PCOS has ovarian cysts. Doctors diagnose PCOS based on symptoms, blood tests, and sometimes an ultrasound—not cysts alone.

Early diagnosis and care can help lower the risk of longterm health problems, such as type 2 diabetes and heart disease.

**Common Symptoms of PCOS**

PCOS symptoms can be different for each person. Some people have only one or two symptoms, while others have many. Common signs include:
• Irregular or missed periods
• Extra hair growth (on the face, chin, chest, or stomach)
• Acne
• Weight gain or trouble losing weight
• Dark patches of skin
• Ovarian cysts
• Thinning hair on the head
• Difficulty getting pregnant

**What Causes PCOS?**

Doctors don’t know the exact cause, but several things may contribute:

**1. Hormone Imbalance** 

High androgen levels can stop the ovaries from releasing eggs regularly. This leads to irregular periods, acne, and extra hair growth.

**2. Insulin Resistance**

Many people with PCOS have insulin resistance, meaning their bodies don’t use insulin well.
This causes insulin levels to rise, which leads the ovaries to make more androgens.
Being overweight can make insulin resistance worse.

**3. Genetics**

PCOS often runs in families. If a parent or sibling has PCOS, the chances of having it are higher.

**Treatment and Management**

Treatment of PCOS can include lifestyle changes, medications or a combination of both

**Living With PCOS** 

PCOS is a lifelong condition, but many people manage it well with the right care.
Regular checkins with a doctor can help prevent complications and support overall health.
If you think you might have PCOS—or if you have it and want help managing your symptoms—talk with a healthcare professional. 
You are not alone, and support is available. 

For more information, contact us at hello@yarrowcare.org.`;

// ─── Contraceptives (from Did you know.pdf — Contraceptives section only) ────
const contraceptivesFull = `

**Birth Control Pills**
• Birth control pills work best when taken at the same time every day. In addition to preventing pregnancy, some pills can also help with lighter periods, more regular cycles, and reduced menstrual cramps.

**Birth Control Patch**
• 
The birth control patch is changed once a week, making it a convenient option for people who don't want to remember a daily pill.

**Birth Control Ring**
• 
The vaginal ring is placed for three weeks and removed for one week, providing month-long pregnancy protection with minimal routine maintenance.

**Hormonal IUD**
• 
A hormonal IUD can work for 3–8 years, depending on the type. Many people experience lighter periods or no periods at all over time.

**Copper IUD**
• 
The copper IUD contains no hormones and can prevent pregnancy for up to 10 years. It can also be used as emergency contraception if placed shortly after sex.

**Birth Control Shot**
• 
The birth control shot is given once every three months, making it a low-maintenance option. Some people may notice changes in their menstrual cycle while using it.
 
**Birth Control Implant**
• 
The implant is a small, flexible rod placed in the upper arm and provides protection for up to 3 years. You don't have to think about contraception daily or monthly.

**Condoms**
• 
Condoms are the only contraceptive method that helps protect against sexually transmitted infections (STIs) when used correctly.

**Emergency Contraception**
• 
Emergency contraception can help prevent pregnancy after unprotected sex and works best when taken as soon as possible.

**Choosing the Right Method**
• 
There is no single "best" birth control option. The right method depends on health needs, lifestyle, comfort, and personal preferences.

For more information, contact us at hello@yarrowcare.org.`;

// ─── Menstrual Product Comparison (from Menstrual Product Comparison Chart.pdf) ─
const comparisonFull = `

**1. How it works**

Pads: Worn outside the body to absorb blood.

Tampons: Inserted into the vagina to absorb blood.

Menstrual Cups: Inserted into the vagina to collect blood.

Menstrual Discs: Inserted to sit at the base of the cervix to collect blood.

**2. Reusable**

Pads: No.

Tampons: No.

Menstrual Cups: Yes (most last several years).

Menstrual Discs: Some are reusable; others are disposable.

**3. How long it can be worn**

Pads: 3–6 hours.

Tampons: 4–8 hours.

Menstrual Cups: Up to 8–12 hours.

Menstrual Discs: Up to 8–12 hours.

*Always follow the manufacturer's instructions and empty or change products sooner if flow is heavy.

**4. Best for**

Pads: Beginners, light to heavy flow, overnight.

Tampons: Moderate to heavy flow, sports, swimming.

Menstrual Cups: Longer wear time, sustainability.

Menstrual Discs: Longer wear time, comfort, some people during activity.

**5. Comfort level**

Pads: External; may feel bulky.

Tampons: Internal; may be felt if not placed correctly.

Menstrual Cups: Internal; may take time to get used to.

Menstrual Discs: Internal; sits higher and may feel less noticeable.

**6. Risk of leaks**

Pads: Moderate (depends on fit and flow).

Tampons: Moderate if full or improperly placed.

Menstrual Cups: Low when fitted correctly.

Menstrual Discs: Low when positioned correctly.

**7. Risk of Toxic Shock Syndrome (TSS)**

Pads: None.

Tampons: Very rare, but possible.

Menstrual Cups: Very rare when used correctly.

Menstrual Discs: Very rare when used correctly.

**8. Environmental impact**

Pads: Single-use waste.

Tampons: Single-use waste.

Menstrual Cups: Low waste (reusable).

Menstrual Discs: Low for reusable; moderate for disposable.

**9. Cost over time**

Pads: Ongoing monthly cost.

Tampons: Ongoing monthly cost.

Menstrual Cups: Higher upfront, lower long-term cost.

Menstrual Discs: Varies by type.

**10. Learning curve**

Pads: Very easy.

Tampons: Easy to moderate.

Menstrual Cups: Moderate.

Menstrual Discs: Moderate.

**11. Good for teens?**

Pads: Yes.

Tampons: Yes (with guidance).

Menstrual Cups: Possibly, depending on comfort.

Menstrual Discs: Possibly, depending on comfort.

**12. Key Takeaways**

• All options are safe and effective when used as directed
• There is no "best" product—the right choice depends on comfort, lifestyle, flow, and personal preference
• Some people use different products at different times (for example, pads at night and tampons or cups during the day)

**13. When to Ask for Guidance**

A healthcare provider can help with:
• Choosing the right product or size
• Managing leaks or discomfort
• Understanding safe use for teens or first-time users

For more information, contact us at hello@yarrowcare.org.`;

// ─── Douching (from Douching.pdf) ─────────────────────────────────────────────
const douchingFull = `

**Douching** is the internal cleansing of the vagina using water or mixtures of fluids such as baking soda, iodine, or vinegar. People may douche to remove odors, "feel fresh," cleanse after menstruation, or try to reduce the risk of infection.

**Why doctors advise against douching**

Despite its popularity, medical professionals strongly advise against douching. It disrupts the natural balance of bacteria in the vagina, which can lead to:
• Bacterial vaginosis
• Yeast infections
• Pelvic Inflammatory Disease (PID)
• Problems getting pregnant

A healthy vagina naturally contains both good and harmful bacteria. Maintaining this balance helps keep the vagina acidic and protected from infections and irritation.
Douching interferes with this balance and can make symptoms worse.

**Should I douche to get rid of vaginal odor or infection?**

No. You should not douche to treat vaginal odor or symptoms like discharge, itching, pain, or irritation.

Douching may temporarily hide odor, but it does not treat the underlying cause and often makes problems worse.

Contact a doctor if you notice:
• Vaginal discharge with a bad smell
• Vaginal itching with thick, white, or yellowgreen discharge
• Burning, redness, or swelling in or around the vagina
• Pain when urinating
• Pain or discomfort during sex

**What is the best way to clean my vagina?**

The vagina is selfcleaning. It produces mucus that naturally removes blood, semen, and discharge.

If you are concerned about vaginal odor, talk to a doctor or nurse. Even healthy vaginas have a mild odor that can change throughout the day. Physical activity can also create a stronger, muskier scent—this is normal.

**How to keep your vagina clean and healthy**

• Wash only the outside of your vagina (vulva) with warm water when bathing
• Some women use mild, unscented soaps, but if you have sensitive skin or a current infection, even mild soap can cause dryness and irritation
• Avoid scented tampons, pads, powders, wipes, and sprays. These products may increase your chances of vaginal irritation or infection

For more information, contact us at hello@yarrowcare.org.`;

// ─── Birth control: Breaking the myth (from Birth Control - Clearing the Myth.pdf) ─
const birthControlMythFull = `

There are many common myths surrounding the use of birth control—especially oral contraceptives. These myths often create fear and confusion for women who may benefit from using them. Let's break down some of the most common misconceptions and clarify the facts.

**Myth #1: Birth control causes permanent infertility**

One of the most widespread myths is that taking birth control will prevent a woman from being able to have children in the future. This is not true.

Birth control pills contain synthetic versions of the hormones estrogen and progesterone, which naturally occur in a woman's body. These hormones work together to regulate the menstrual cycle and prevent ovulation while the pill is being taken.

However, once birth control is stopped, hormone levels typically return to their natural patterns, and ovulation resumes—often within weeks or a few months.

For most women, fertility returns to their normal baseline after discontinuing birth control. If a woman was able to conceive before using birth control, she is generally able to do so afterward, assuming there are no other underlying health conditions.

**Myth #2: Birth control always causes excessive weight gain**

Another common belief is that birth control inevitably leads to significant weight gain.
While some women may experience mild weight changes, this is not universal.
• Certain formulations—particularly older, higher-dose pills or specific hormonal methods—may cause fluid retention or increased appetite
• Many modern low-dose pills have minimal impact on weight
• If weight gain does occur, switching to a different formulation can often resolve the issue

Not all birth control methods affect the body in the same way, and there are many options available.

**Myth #3: Birth control is only for preventing pregnancy**

While pregnancy prevention is a primary function, birth control has several additional medical benefits. Because it helps regulate estrogen and progesterone levels, it can improve symptoms related to hormonal imbalance.

Birth control is commonly prescribed to help with:
• Heavy or prolonged periods
• Painful menstrual cramps
• Irregular cycles
• Acne
• Excess facial hair (such as hair under the chin or around the jaw)
• Hormone-related mood fluctuations

For many women, birth control helps restore hormonal balance and significantly improves quality of life.

**What if someone is concerned about hormones?**

For women who prefer to avoid additional hormones, non-hormonal options are available, including:
• Copper IUDs
• Diaphragms (fitted to the cervix)
• Condoms

These methods prevent pregnancy without introducing hormones into the body.

**The Bottom Line**

Birth control does not cause permanent infertility. Once discontinued, the body returns to its natural hormonal rhythm, allowing pregnancy if no other fertility issues exist.

Additionally, birth control is not solely about preventing pregnancy. It is a valuable medical tool used to regulate hormones, manage painful or heavy periods, treat acne, and address other hormone-related symptoms.

Every woman's body is different. The best approach is to discuss options with a healthcare provider to determine which method aligns with personal health goals, comfort level, and lifestyle.

For more information, contact us at hello@yarrowcare.org.`;

// ─── Understanding Yeast Infections (from Understanding Yeast Infections.pdf) ────
const yeastInfectionFull = `

**A yeast infection** is one of the most common vaginal conditions many people experience at some point in their lives. Although it can be uncomfortable, it is usually easy to recognize and treat. Knowing what causes a yeast infection, how it feels, and what to do when it happens can help you feel more in control of your health.

**What Exactly Is a Yeast Infection?**

A yeast infection happens when too much yeast, grows in the vagina. Yeast is normally present in small amounts, but it stays under control because of the vagina's natural balance of good bacteria. When something upsets that balance, the yeast can multiply and cause symptoms.

**What Causes the Balance to Change?**

Several everyday things can trigger a yeast infection:
• Antibiotics – these kill both good and bad bacteria, giving yeast room to grow
• Tight or non-breathable clothing – moisture and warmth encourage yeast growth
• Hormone changes – such as pregnancy, menstrual cycles, or birth control
• High blood sugar – especially for people with diabetes
• Scented products – sprays, soaps, or douches can irritate the vagina and disrupt balance

These triggers don't cause yeast infections every time, but they can make them more likely.

**Signs and Symptoms to Look Out For**

Yeast infections tend to have some very recognizable symptoms. Many people report:
• Intense itching in or around the vagina
• Thick, white discharge that looks like cottage cheese
• Redness or swelling of the vulva
• Burning or irritation, especially when urinating
• Little to no odor, which helps distinguish it from bacterial infections

Even though these symptoms are common, they can sometimes be confused with other issues like bacterial vaginosis or certain sexually transmitted infections. That's why noticing your symptoms early and paying attention to how your body normally feels is helpful.

**How Are Yeast Infections Treated?**

Fortunately, yeast infections are usually simple to treat. Many people use antifungal creams or suppositories that are available in most drugstores. These treatments often relieve symptoms within a few days.

A healthcare provider may also prescribe a pill that treats the infection from the inside out. This is especially helpful for people who get yeast infections often or have more stubborn symptoms.

**When Should You See a Doctor?**

It's a good idea to talk to a doctor or nurse if:
• This is your first time experiencing symptoms
• Medications from the drugstore don't work after a few days
• You get yeast infections four or more times a year
• You are pregnant
• You're unsure whether the symptoms are from a yeast infection or something else

**Tips for Preventing Yeast Infections**

You may not always be able to prevent a yeast infection, but a few healthy habits can reduce your risk:
• Wear cotton underwear to keep the area dry
• Change out of wet clothing, like swimsuits or gym clothes, quickly
• Avoid scented soaps, wipes, and douches
• Keep the vaginal area clean using warm water only
• Manage blood sugar levels if you have diabetes

**Final Thoughts**

Yeast infections are common, treatable, and nothing to be embarrassed about. Understanding how they happen, recognizing the symptoms, and knowing when to seek help empowers you to take care of your body with confidence. With the right knowledge and care, most people can manage yeast infections easily and prevent them from coming back.

For more information, contact us at hello@yarrowcare.org.`;

// ─── Healthy Aging for Women Over 50 (from Healthy Aging for Women Over 50.pdf) ─
const healthyAgingFull = `
Aging is something we all go through, and the beautiful thing is that with a few simple habits, women over 50 can continue to feel strong, energized, and deeply well. This stage of life brings changes—some expected, some surprising—but staying connected to your body and caring for your overall well-being can help you feel your best every day.

As you move through your 50s and beyond, you may notice shifts like a slower metabolism, changes in sleep, or the occasional hot flash. Bone density can naturally decrease, and heart health becomes something to pay closer attention to. These changes aren't "good" or "bad"—they're simply part of this chapter, and knowing about them can help you stay proactive.

Routine checkups are one of the easiest ways to stay ahead of your health. Things like blood pressure, cholesterol, and diabetes screenings give you a clear picture of what's going on inside. Your doctor might also recommend mammograms, bone density scans, or colon cancer screenings. Think of these visits not as chores but as tools that keep you informed and empowered.

Nutrition plays an important role too. Filling your plate with colorful fruits, vegetables, whole grains, and lean proteins supports everything from energy levels to bone strength. Calcium and vitamin D are especially helpful for bones, while magnesium and fiber support digestion, mood, and overall wellness. And while treats are always allowed, easing up on highly processed or salty foods can make you feel noticeably better.

Movement is another powerful way to support yourself. Even 30 minutes of walking, stretching, yoga, or gentle strength training can lift your mood, help you sleep better, and keep your muscles and balance strong. The goal isn't perfection—it's simply finding ways to move that feel good to you.

Your bones and heart deserve a little extra love around this time of life. Getting enough calcium and vitamin D, doing weight-bearing exercises, avoiding smoking, and drinking alcohol in moderation all help keep your bones resilient. Staying active, eating with your heart in mind, and keeping an eye on blood pressure and cholesterol can help protect your heart for years to come.

And just as important as physical health is your emotional well-being. Staying connected with people who lift you up, spending time on hobbies that bring you joy, and finding calm through deep breathing, prayer, meditation, or quiet moments can do wonders. Sleep also becomes even more essential—good rest helps regulate mood, energy, and overall health.

At the end of the day, healthy aging isn't about big, dramatic changes. It's about small, meaningful choices you make over time. By tuning in to what your body needs, staying curious about your health, and giving yourself grace along the way, you can continue to feel vibrant, confident, and grounded well beyond your 50s. If you ever have questions about what's right for you personally, your healthcare provider is always the best partner to help you find the right path forward.

For more information, contact us at hello@yarrowcare.org.`;

// ─── Hot Flashes and How to Manage Them (from Hot Flashes and How to Manage Them.docx.pdf) ─
const hotFlashesFull = `

Hot flashes are one of the most common and disruptive symptoms of menopause. They involve a sudden feeling of intense heat that spreads through the body—often with flushing, dizziness, sweating, or, in some cases, chills afterward. Episodes typically last a few minutes but can feel much longer.

About 80% of women going through menopause experience hot flashes. They can begin as early as age 40 and may continue for 7–10 years. Hot flashes are also common in women who:
• Are perimenopausal or menopausal
• Experience early or premature menopause
• Have had their ovaries surgically removed
• Receive treatments that affect hormone levels

When hot flashes occur at night, they are known as night sweats, which can disrupt sleep and lead to fatigue, reduced productivity, and mood or relationship changes.

**What Causes Hot Flashes?**

Declining estrogen levels during menopause is the primary cause. However, several factors can worsen symptoms, including:
• Anxiety or mood changes
• Spicy foods
• Alcohol
• Caffeine

Research shows that Black women may be up to 50% more likely to experience hot flashes. Obesity is also a known risk factor.

**Managing Hot Flashes**

Hot flashes can significantly impact quality of life, but several treatment options are available. Because responses to treatment vary, management should be individualized.

**Lifestyle Strategies**
• Dress in light, removable layers
• Use a portable fan
• Maintain a healthy weight
• Practice mindfulness or meditation
• Avoid known dietary and emotional triggers

**Medical Options**

Hormone replacement therapy (HRT) is often effective but is not recommended for individuals with certain cancers, heart disease, or blood clotting disorders.

For those who cannot take hormones, non-hormonal treatments may help. A healthcare provider can determine the best approach based on medical history and symptoms.

**When to Seek Help**

Women do not need to suffer in silence. If hot flashes affect sleep, energy, or daily life, medical support is available. A healthcare provider can evaluate symptoms and recommend personalized treatment options.

For more information, contact us at hello@yarrowcare.org.`;

// ─── Know Your Bones (from Know Your Bones.docx.pdf) ─────────────────────────
const knowYourBonesFull = `
Osteoporosis is a common condition that weakens bones and makes them more prone to fractures. As bone density decreases, even minor falls or everyday movements can lead to breaks—most often in the spine, hips, and wrists. Although osteoporosis can affect anyone, it is especially common in women, particularly after menopause. In fact, about half of women over age 50 will experience an osteoporosis-related fracture during their lifetime.

A major reason women are at higher risk after menopause is the steep drop in estrogen, a hormone essential for maintaining strong bones. During the first five to seven years after menopause, women may lose up to 20% of their bone mass. Osteoporosis develops when too much old bone is broken down or when the body cannot rebuild bone fast enough to replace what is lost.

Good nutrition, physical activity, and healthy lifestyle habits play a crucial role in protecting bone health. Bones need specific vitamins and minerals to stay strong, including calcium, vitamin D, magnesium, phosphorus, and vitamin K. Eating at least two servings of calcium-rich foods daily—such as dairy products, leafy greens, or calcium-fortified foods—helps support bone strength. Vitamin D is equally important, because it helps the body absorb calcium. Sun exposure, certain foods, and supplements can help maintain healthy vitamin D levels.

Regular exercise also supports bone health. Weight-bearing activities like walking, dancing, and strength training stimulate bone formation and help slow bone loss. Most adults should aim for 30 minutes of physical activity most days of the week. Lifestyle choices matter, too—avoiding smoking and limiting alcohol can significantly reduce the risk of fractures.

For some people, supplements may be necessary, particularly if dietary intake of calcium or vitamin D is insufficient. A healthcare provider can help determine if supplements, bone density testing, or medical treatment are appropriate. Early prevention and routine monitoring can make a meaningful difference in maintaining lifelong bone strength.

**Bone Health Checklist**

Use this quick checklist to support strong bones every day.

**Daily**
• Ate 2+ servings of calcium-rich foods
• Got sunlight or took vitamin D
• Included nutrient-rich foods (magnesium, vitamin K, phosphorus)
• Avoided smoking
• Limited alcohol

**Weekly**
• Completed strength training 2–3 times
• Did weight-bearing activity 3–5 days
• Prepared bone-healthy meals

**Long-Term**
• Discussed bone health with my doctor
• Know whether I need a bone density test
• Reviewed supplements or treatment options

For more information, contact us at hello@yarrowcare.org.`;

// ─── Understanding HPV (from Understanding HPV.docx.pdf) ─────────────────────
const understandingHpvFull = `
Human papillomavirus (HPV) is one of the most common viral infections worldwide. Although HPV is very common, many people are unaware they have it because most types cause no symptoms and go away on their own. Still, certain strains can lead to important long-term health concerns, which makes awareness and prevention essential.

**What Is HPV?**

HPV is a group of more than 100 related viruses. Some types affect the skin, while others affect areas such as the cervix, throat, and other parts of the body. Most HPV infections are temporary and harmless, but a few types are considered high-risk due to their potential to cause cancer.

**How HPV Affects Health**

While many HPV infections clear naturally, persistent infection with high-risk HPV types can lead to:
• Cervical cancer
• Vaginal or vulvar cancer
• Anal cancer
• Throat (oropharyngeal) cancer
• Penile cancer

Other HPV types may cause non-cancerous changes such as skin or mucosal growths. Because the virus often causes no symptoms, people can carry HPV without knowing it.

**Who Is at Risk?**

HPV can affect anyone. Most infections occur in young adults, but people of all ages can be exposed. The virus spreads through close skin-to-skin contact, and because it is so common, most people will come into contact with HPV at some point in their lives.

**Prevention and Protection**

Although HPV is widespread, there are effective ways to reduce risk and protect long-term health:

**HPV Vaccination**

The HPV vaccine offers strong protection against the most harmful strains of the virus. It is recommended for preteens, teens, and adults up to age 45. Even if someone has been exposed to HPV in the past, the vaccine can still provide meaningful protection against strains they have not encountered.

**Routine Screening**

Regular cervical cancer screening (Pap test and HPV testing) is essential for early detection and prevention of cervical disease. Screening can identify early changes before they become serious.

**Healthy Prevention Practices**

Maintaining regular healthcare visits and staying informed about personal risk are key parts of prevention. Your healthcare provider can help determine the right screening schedule and whether vaccination is right for you.

**Why Awareness Matters**

HPV is common, but HPV-related cancers are largely preventable through vaccination and routine screening. Understanding the virus—and taking simple preventive steps—can significantly reduce risk and support long-term health.

If you have questions about HPV, vaccination, or screening, speak with your healthcare provider to learn what options are best for you.

For more information, contact us at hello@yarrowcare.org.`;

export const healthTopics: HealthTopic[] = [
  {
    slug: "what-is-a-period",
    title: "What Is a Period",
    summary: first100Words(whatIsAPeriodFull),
    content: whatIsAPeriodFull,
  },
  // {
  //   slug: "contraceptives",
  //   title: "Contraceptives",
  //   summary: first100Words(contraceptivesFull),
  //   content: contraceptivesFull,
  // },
  {
    slug: "pcos",
    title: "PCOS (Polycystic Ovary Syndrome)",
    summary: first100Words(pcosFull),
    content: pcosFull,
  },
  {
    slug: "menstrual-cramps",
    title: "Menstrual Cramps",
    summary: first100Words(menstrualCrampsFull),
    content: menstrualCrampsFull,
  },
  {
    slug: "menstrual-cups-and-discs",
    title: "Menstrual Cups and Discs",
    summary: first100Words(menstrualCupsAndDiscsFull),
    content: menstrualCupsAndDiscsFull,
  },
  {
    slug: "menstrual-product-comparison",
    title: "Menstrual Product Comparison",
    summary: first100Words(comparisonFull),
    content: comparisonFull,
  },
  {
    slug: "douching",
    title: "Douching",
    summary: first100Words(douchingFull),
    content: douchingFull,
  },
  {
    slug: "birth-control-clearing-the-myth",
    title: "Birth control: Breaking the myth",
    summary: first100Words(birthControlMythFull),
    content: birthControlMythFull,
  },
  {
    slug: "understanding-yeast-infection",
    title: "Understanding Yeast Infections: A Simple Guide",
    summary: first100Words(yeastInfectionFull),
    content: yeastInfectionFull,
  },
  {
    slug: "healthy-aging-for-women-over-50",
    title: "Healthy Aging for Women Over 50",
    summary: first100Words(healthyAgingFull),
    content: healthyAgingFull,
  },
  {
    slug: "hot-flashes-and-how-to-manage-them",
    title: "Hot Flashes and How to Manage Them",
    summary: first100Words(hotFlashesFull),
    content: hotFlashesFull,
  },
  {
    slug: "know-your-bones",
    title: "Know Your Bones: Understanding Osteoporosis and Protecting Your Bone Health",
    summary: first100Words(knowYourBonesFull),
    content: knowYourBonesFull,
  },
  {
    slug: "understanding-hpv",
    title: "Understanding HPV: What You Need to Know",
    summary: first100Words(understandingHpvFull),
    content: understandingHpvFull,
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
