import { InputField } from './entities/fields/input-field.entity';
import { MultiChoiceField } from './entities/fields/multi-choice-field.entity';
import { NumericField } from './entities/fields/numeric-field.entity';
import { SingleChoiceField } from './entities/fields/single-choice-field.entity';
import { SurveyConfig } from './entities/survey-config.entity';
import { SurveyStepConfig } from './entities/survey-step-config.entity';

export function getMockSurveys() {
  const nameField = new InputField();
  nameField.label = 'Enter your first and last name';
  const nameStep = new SurveyStepConfig();
  nameStep.text = 'Patient Information';
  nameStep.field = nameField;

  const genderField = new SingleChoiceField();
  genderField.label = 'Your gender';
  genderField.options = ['Male', 'Female'];
  const genderStep = new SurveyStepConfig();
  genderStep.text = 'Gender';
  genderStep.field = genderField;

  const ageField = new NumericField();
  ageField.label = 'Indicate your age';
  const ageStep = new SurveyStepConfig();
  ageStep.text = 'Age';
  ageStep.field = ageField;

  const complaintField = new InputField();
  complaintField.label = 'Describe your health issue or complaint';
  const complaintStep = new SurveyStepConfig();
  complaintStep.text = 'Issue Description';
  complaintStep.field = complaintField;

  const symptomsField = new MultiChoiceField();
  symptomsField.label = 'Select the symptoms you are experiencing';
  symptomsField.options = ['Pain', 'Dizziness', 'Nausea', 'Body aches', 'High fever'];
  const symptomsStep = new SurveyStepConfig();
  symptomsStep.text = 'Symptoms';
  symptomsStep.field = symptomsField;

  const chronicDiseasesField = new InputField();
  chronicDiseasesField.label = 'List your chronic diseases, if any';
  const chronicDiseasesStep = new SurveyStepConfig();
  chronicDiseasesStep.text = 'Chronic Illnesses';
  chronicDiseasesStep.field = chronicDiseasesField;

  const medsField = new InputField();
  medsField.label = 'List the medications you take regularly';
  const medsStep = new SurveyStepConfig();
  medsStep.text = 'Regular Medications';
  medsStep.field = medsField;

  const allergiesField = new InputField();
  allergiesField.label = 'List any drug allergies';
  const allergiesStep = new SurveyStepConfig();
  allergiesStep.text = 'Drug Allergies';
  allergiesStep.field = allergiesField;

  const habitsField = new MultiChoiceField();
  habitsField.label = 'Indicate any harmful habits you have';
  habitsField.options = ['Smoking', 'Alcohol consumption', 'Drug use'];
  const habitsStep = new SurveyStepConfig();
  habitsStep.text = 'Harmful Habits';
  habitsStep.field = habitsField;

  const contactField = new InputField();
  contactField.label = 'Enter your contact phone number or e-mail';
  const contactStep = new SurveyStepConfig();
  contactStep.text = 'Contact Information';
  contactStep.field = contactField;

  const hobbiesField = new MultiChoiceField();
  hobbiesField.label = 'Indicate your hobbies';
  hobbiesField.options = ['Reading', 'Traveling', 'Cooking', 'Sports', 'Gaming'];
  const hobbiesStep = new SurveyStepConfig();
  hobbiesStep.text = 'Hobbies';
  hobbiesStep.field = hobbiesField;

  const employmentField = new InputField();
  employmentField.label = 'Enter your current employment status';
  const employmentStep = new SurveyStepConfig();
  employmentStep.text = 'Employment';
  employmentStep.field = employmentField;

  const stressLevelField = new NumericField();
  stressLevelField.label = 'On a scale from 1 to 10, rate your current stress level';
  const stressLevelStep = new SurveyStepConfig();
  stressLevelStep.text = 'Stress Level';
  stressLevelStep.field = stressLevelField;

  const exerciseFrequencyField = new SingleChoiceField();
  exerciseFrequencyField.label = 'How often do you exercise?';
  exerciseFrequencyField.options = ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'];
  const exerciseFrequencyStep = new SurveyStepConfig();
  exerciseFrequencyStep.text = 'Exercise Frequency';
  exerciseFrequencyStep.field = exerciseFrequencyField;

  const dietField = new MultiChoiceField();
  dietField.label = 'Select the types of diets you follow';
  dietField.options = ['Vegan', 'Keto', 'Paleo', 'Vegetarian', 'Mediterranean'];
  const dietStep = new SurveyStepConfig();
  dietStep.text = 'Diet Types';
  dietStep.field = dietField;

  const sixStepSurvey = new SurveyConfig();
  sixStepSurvey.title = 'General Health Survey';
  sixStepSurvey.stepConfigs = [nameStep, genderStep, ageStep, complaintStep, symptomsStep, chronicDiseasesStep];

  const tenStepSurvey = new SurveyConfig();
  tenStepSurvey.title = 'Comprehensive Health Survey';

  tenStepSurvey.stepConfigs = [
    nameStep,
    genderStep,
    ageStep,
    complaintStep,
    symptomsStep,
    chronicDiseasesStep,
    medsStep,
    allergiesStep,
    habitsStep,
    contactStep,
  ];

  const fifteenStepSurvey = new SurveyConfig();
  fifteenStepSurvey.title = 'Extended Lifestyle and Health Survey';

  fifteenStepSurvey.stepConfigs = [
    nameStep,
    genderStep,
    ageStep,
    complaintStep,
    symptomsStep,
    chronicDiseasesStep,
    medsStep,
    allergiesStep,
    habitsStep,
    contactStep,
    hobbiesStep,
    employmentStep,
    stressLevelStep,
    exerciseFrequencyStep,
    dietStep,
  ];

  return [sixStepSurvey, tenStepSurvey, fifteenStepSurvey];
}
