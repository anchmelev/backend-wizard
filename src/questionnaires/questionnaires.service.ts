import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { InputField } from './entities/fields/input-field.entity';
import { QuestionnaireStep } from './entities/steps/questionnaire-step.entity';
import { SingleChoiceField } from './entities/fields/single-choice-field.entity';
import { NumericField } from './entities/fields/numeric-field.entity';
import { MultiChoiceField } from './entities/fields/multi-choice-field.entity';

@Injectable()
export class QuestionnairesService implements OnModuleInit {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepo: Repository<Questionnaire>,

    @InjectRepository(QuestionnaireStep)
    private readonly questionnaireStepRepo: Repository<QuestionnaireStep>,
  ) {}

  findAll(): Promise<Questionnaire[]> {
    return this.questionnaireRepo.find({
      relations: {
        steps: true,
      },
    });
  }

  async findSteps(questionnaireId: number): Promise<QuestionnaireStep[]> {
    const foundQuestionnaire = await this.questionnaireRepo.findOne({
      where: { id: questionnaireId },
      relations: ['steps', 'steps.field'],
    });

    if (!foundQuestionnaire) {
      throw new NotFoundException(`Questionnaire with ID ${questionnaireId} not found`);
    }

    return foundQuestionnaire.steps;
  }

  async onModuleInit() {
    const exists = await this.questionnaireRepo.count();
    if (exists) return; // Если анкета уже существует, не создаем ее

    const questionnaire = new Questionnaire();
    questionnaire.title = 'Medical Questionnaire for Initial Visit';

    // 1. Name input
    const nameField = new InputField();
    nameField.label = 'Enter your first and last name';
    const nameStep = new QuestionnaireStep();
    nameStep.text = 'Patient Information';
    nameStep.field = nameField;

    // 2. Gender selection
    const genderField = new SingleChoiceField();
    genderField.label = 'Your gender';
    genderField.options = ['Male', 'Female'];
    const genderStep = new QuestionnaireStep();
    genderStep.text = 'Gender';
    genderStep.field = genderField;

    // 3. Age input
    const ageField = new NumericField();
    ageField.label = 'Indicate your age';
    const ageStep = new QuestionnaireStep();
    ageStep.text = 'Age';
    ageStep.field = ageField;

    // 4. Health issue or complaint description
    const complaintField = new InputField();
    complaintField.label = 'Describe your health issue or complaint';
    const complaintStep = new QuestionnaireStep();
    complaintStep.text = 'Issue Description';
    complaintStep.field = complaintField;

    // 5. Selecting symptoms from a list
    const symptomsField = new MultiChoiceField();
    symptomsField.label = 'Select the symptoms you are experiencing';
    symptomsField.options = ['Pain', 'Dizziness', 'Nausea', 'Body aches', 'High fever'];
    const symptomsStep = new QuestionnaireStep();
    symptomsStep.text = 'Symptoms';
    symptomsStep.field = symptomsField;

    // 6. Indicating chronic illnesses
    const chronicDiseasesField = new InputField();
    chronicDiseasesField.label = 'List your chronic diseases, if any';
    const chronicDiseasesStep = new QuestionnaireStep();
    chronicDiseasesStep.text = 'Chronic Illnesses';
    chronicDiseasesStep.field = chronicDiseasesField;

    // 7. Indicating regularly taken medications
    const medsField = new InputField();
    medsField.label = 'List the medications you take regularly';
    const medsStep = new QuestionnaireStep();
    medsStep.text = 'Regular Medications';
    medsStep.field = medsField;

    // 8. Indicating drug allergies
    const allergiesField = new InputField();
    allergiesField.label = 'List any drug allergies';
    const allergiesStep = new QuestionnaireStep();
    allergiesStep.text = 'Drug Allergies';
    allergiesStep.field = allergiesField;

    // 9. Indicating harmful habits
    const habitsField = new MultiChoiceField();
    habitsField.label = 'Indicate any harmful habits you have';
    habitsField.options = ['Smoking', 'Alcohol consumption', 'Drug use'];
    const habitsStep = new QuestionnaireStep();
    habitsStep.text = 'Harmful Habits';
    habitsStep.field = habitsField;

    // 10. Contact information input
    const contactField = new InputField();
    contactField.label = 'Enter your contact phone number or e-mail';
    const contactStep = new QuestionnaireStep();
    contactStep.text = 'Contact Information';
    contactStep.field = contactField;

    questionnaire.steps = [
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

    await this.questionnaireRepo.save(questionnaire);
  }
}
