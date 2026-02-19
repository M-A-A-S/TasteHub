import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import Input from "../UI/Input";
import ImagePicker from "../ImagePicker";
import GenderSelect from "../GenderSelect";
import EmploymentStatusSelect from "../EmploymentStatusSelect";
import JobTitleSelect from "../JobTitleSelect";
import RoleSelect from "../RoleSelect";
import Checkbox from "../UI/Checkbox";
import RolesSelect from "../RolesSelect";

const initialFormState = {
  id: "",
  personId: "",
  userId: "",
  createUserAccount: false,

  hireDate: "",
  terminationDate: "",
  jobTitleId: "",
  baseSalary: "",
  employmentStatus: "",

  person: {
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    imageUrl: "",
    imageFile: null,
    deleteImage: false,
  },

  user: {
    email: "",
    username: "",
    password: "",
    isActive: "",
    roleId: "",
    roles: [],
  },
};

const AddEditEmployeeModal = ({
  show,
  onClose,
  onConfirm,
  employee,
  loading,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const { translations, language } = useLanguage();

  const {
    first_name_label,
    first_name_placeholder,
    first_name_error,
    last_name_label,
    last_name_placeholder,
    last_name_error,
    phone_label,
    phone_placeholder,
    phone_error,
    gender_label,
    gender_placeholder,
    gender_error,
    date_of_birth_label,
    date_of_birth_placeholder,
    date_of_birth_error,
    image_label,
    image_placeholder,
    delete_image_label,
    email_label,
    email_placeholder,
    email_error,
    username_label,
    username_placeholder,
    username_error,
    password_label,
    password_placeholder,
    password_error,
    hire_date_label,
    hire_date_placeholder,
    hire_date_error,
    termination_date_label,
    termination_date_placeholder,
    job_title_label,
    job_title_placeholder,
    job_title_error,
    base_salary_label,
    base_salary_placeholder,
    base_salary_error,
    employment_status_label,
    employment_status_placeholder,
    employment_status_error,
    roles_label,
    roles_error,
    create_user_account_label,
    user_section_title,
  } = translations.pages.employees_page.form;

  const { edit_employee, add_new_employee, active, inactive } =
    translations.pages.employees_page;

  const { default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updatePersonField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      person: { ...prev.person, [field]: value },
    }));
  };

  const updateUserField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, [field]: value },
    }));
  };

  // useEffect(() => {
  //   if (supplier) {
  //     setFormData({
  //       personId: supplier.personId || "",
  //       person: {
  //         firstName: supplier.person.firstName || "",
  //         lastName: supplier.person.lastName || "",
  //         phone: supplier.person.phone || "",
  //         gender: supplier.person.gender !== "" ? supplier.person.gender : "",
  //         dateOfBirth: supplier.person.dateOfBirth || "",
  //         imageUrl: supplier.person.imageUrl || "",
  //         imageFile: null,
  //         deleteImage: false,
  //       },
  //     });
  //   } else {
  //     setFormData(initialFormState);
  //   }
  //   setErrors({});
  // }, [supplier, show]);

  // useEffect(() => {
  //   if (employee) {
  //     setFormData({
  //       ...initialFormState,
  //       ...employee,
  //       createUserAccount: !!employee.userId,
  //     });
  //   } else {
  //     setFormData(initialFormState);
  //   }
  //   setErrors({});
  // }, [employee, show]);

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id || "",
        personId: employee.personId || "",
        userId: employee.userId || "",
        createUserAccount: employee.userId ? true : false,

        hireDate: employee.hireDate || "",
        terminationDate: employee.terminationDate || "",
        jobTitleId: employee.jobTitleId !== "" ? employee.jobTitleId : "",
        baseSalary: employee.baseSalary || "",
        employmentStatus:
          employee.employmentStatus !== "" ? employee.employmentStatus : "",

        person: {
          firstName: employee.person.firstName || "",
          lastName: employee.person.lastName || "",
          phone: employee.person.phone || "",
          gender: employee.person.gender !== "" ? employee.person.gender : "",
          dateOfBirth: employee.person.dateOfBirth || "",
          imageUrl: employee.person.imageUrl || "",
          imageFile: null,
          deleteImage: false,
        },

        user: {
          email: employee?.userInfo?.email || "",
          username: employee?.userInfo?.username || "",
          password: employee?.userInfo?.password || "",
          isActive: employee?.userInfo?.isActive || "",
          roles:
            employee?.userInfo?.roles.map(
              (userRole) => `${userRole.role.id}`,
            ) || [],
        },
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [employee, show]);

  useEffect(() => {
    validateFormData();
  }, [language]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.person.firstName.trim()) {
      temp.firstName = first_name_error;
    }

    if (!formData.person.lastName.trim()) {
      temp.lastName = last_name_error;
    }

    if (!formData.person.phone.trim()) {
      temp.phone = phone_error;
    }

    if (!formData.person.dateOfBirth) {
      temp.dateOfBirth = date_of_birth_error;
    }

    if (formData.person.gender === "") {
      temp.gender = gender_error;
    }

    if (!formData.hireDate) {
      temp.hireDate = hire_date_error;
    }

    if (!formData.jobTitleId) {
      temp.jobTitleId = job_title_error;
    }

    if (!formData.baseSalary) {
      temp.baseSalary = base_salary_error;
    }

    // if (formData.employmentStatus === "") {
    //   temp.employmentStatus = employment_status_error;
    // }

    if (formData.createUserAccount) {
      if (!formData.user.email.trim()) {
        temp.email = email_error;
      }

      if (!formData.user.username.trim()) {
        temp.username = username_error;
      }

      if (!employee && !formData.user.password.trim()) {
        temp.password = password_error;
      }

      if (!formData.user.roles.length) {
        temp.roles = roles_error;
      }
      // if (!formData.user.roleId) {
      //   temp.roles = roles_error;
      // }
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    console.log("formData -> ", formData);

    // updateUserField(
    //   "roles",
    //   formData.user.roles.map((roleId) => ({
    //     roleId: roleId,
    //   })),
    // );

    // formData.user.roles = formData.user.roles.map((roleId) => ({
    //   roleId: roleId,
    // }));

    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    const payload = new FormData();

    if (formData.id) {
      payload.append("id", formData.id);
    }
    if (formData.personId) {
      payload.append("personId", formData.personId);
    }
    if (formData.userId) {
      payload.append("userId", formData.userId);
    }

    payload.append("hireDate", formData.hireDate);
    if (formData.terminationDate) {
      payload.append("terminationDate", formData.terminationDate || "");
    }
    payload.append("jobTitleId", formData.jobTitleId);
    payload.append("baseSalary", formData.baseSalary);

    if (formData.employmentStatus) {
      payload.append("employmentStatus", formData.employmentStatus);
    }

    payload.append("createUserAccount", formData.createUserAccount);

    // Person
    payload.append("person.firstName", formData.person.firstName);
    payload.append("person.lastName", formData.person.lastName);
    payload.append("person.phone", formData.person.phone);
    payload.append("person.gender", formData.person.gender);
    payload.append("person.dateOfBirth", formData.person.dateOfBirth);

    if (formData.person.imageFile) {
      payload.append("person.imageFile", formData.person.imageFile);
    }

    if (formData.person.imageUrl && !formData.person.imageFile) {
      payload.append("person.imageUrl", formData.person.imageUrl);
    }

    // payload.append("person.deleteImage", formData.person.deleteImage);

    // User (optional)
    if (formData.createUserAccount) {
      payload.append("user.email", formData.user.email);
      payload.append("user.username", formData.user.username);

      if (employee && formData.user.isActive !== "") {
        payload.append("user.isActive", formData.user.isActive);
      }

      if (formData.user.password)
        payload.append("user.password", formData.user.password);

      var roles = formData.user.roles.map((roleId) => ({
        roleId: roleId,
      }));

      // formData.user.roles.forEach((r, i) =>
      //   payload.append(`user.roles[${i}]`, r),
      // );
      roles.forEach((role, i) => {
        payload.append(`user.roles[${i}].roleId`, role.roleId);
      });
    }

    safeCall(onConfirm)(payload);
  };

  console.log("formData -> ", formData);

  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={employee ? edit_employee : add_new_employee}
      onSave={handleSubmit}
      loading={loading}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        {/* User info */}
        <Input
          label={first_name_label}
          placeholder={first_name_placeholder}
          value={formData.person.firstName}
          errorMessage={errors.firstName}
          onChange={(e) => updatePersonField("firstName", e.target.value)}
          showLabel={true}
        />
        <Input
          label={last_name_label}
          placeholder={last_name_placeholder}
          value={formData.person.lastName}
          errorMessage={errors.lastName}
          onChange={(e) => updatePersonField("lastName", e.target.value)}
          showLabel={true}
        />

        <Input
          label={phone_label}
          placeholder={phone_placeholder}
          value={formData.person.phone}
          errorMessage={errors.phone}
          onChange={(e) => updatePersonField("phone", e.target.value)}
          showLabel={true}
        />

        <Input
          type="date"
          label={date_of_birth_label}
          value={formData.person.dateOfBirth}
          errorMessage={errors.dateOfBirth}
          onChange={(e) => updatePersonField("dateOfBirth", e.target.value)}
          showLabel={true}
        />

        <GenderSelect
          value={formData.person.gender}
          onChange={(e) => updatePersonField("gender", e.target.value)}
          label={gender_label}
          errorMessage={errors.gender}
        />

        <ImagePicker
          label={image_label}
          imageUrl={formData.person.imageUrl}
          imageFile={formData.person.imageFile}
          onChange={({ imageUrl, imageFile }) =>
            setFormData((prev) => ({
              ...prev,
              person: {
                ...prev.person,
                imageUrl,
                imageFile,
              },
            }))
          }
        />

        {/* Employee info */}

        <Input
          type="date"
          label={hire_date_label}
          value={formData.hireDate}
          errorMessage={errors.hireDate}
          onChange={(e) => updateField("hireDate", e.target.value)}
          showLabel={true}
        />

        {employee && (
          <Input
            type="date"
            label={termination_date_label}
            value={formData.terminationDate}
            errorMessage={errors.terminationDate}
            onChange={(e) => updateField("terminationDate", e.target.value)}
            showLabel={true}
          />
        )}

        <Input
          type="number"
          label={base_salary_label}
          value={formData.baseSalary}
          errorMessage={errors.baseSalary}
          onChange={(e) => updateField("baseSalary", e.target.value)}
          showLabel={true}
        />

        <JobTitleSelect
          name="jobTitleId"
          value={formData.jobTitleId}
          onChange={(e) => updateField("jobTitleId", e.target.value)}
          label={job_title_label}
          showLabel={true}
          errorMessage={errors.jobTitleId}
        />

        {employee && (
          <EmploymentStatusSelect
            value={formData.employmentStatus}
            onChange={(e) => updateField("employmentStatus", e.target.value)}
            label={employment_status_label}
            errorMessage={errors.employmentStatus}
          />
        )}

        <Checkbox
          label={create_user_account_label}
          checked={formData.createUserAccount}
          disabled={employee}
          onChange={(e) => updateField("createUserAccount", e.target.checked)}
          className="accent-orange-600"
        />

        {formData.createUserAccount && (
          <div>
            <h4>{user_section_title}</h4>

            <Input
              label={email_label}
              placeholder={email_placeholder}
              value={formData.user.email}
              errorMessage={errors.email}
              onChange={(e) => updateUserField("email", e.target.value)}
              showLabel={true}
            />

            <Input
              label={username_label}
              placeholder={username_placeholder}
              value={formData.user.username}
              errorMessage={errors.username}
              onChange={(e) => updateUserField("username", e.target.value)}
              showLabel={true}
            />

            {!employee && (
              <Input
                label={password_label}
                placeholder={password_placeholder}
                value={formData.user.password}
                errorMessage={errors.password}
                onChange={(e) => updateUserField("password", e.target.value)}
                showLabel={true}
              />
            )}

            <Checkbox
              label={formData.user.isActive == true ? active : inactive}
              checked={formData.user.isActive}
              onChange={(e) => updateUserField("isActive", e.target.checked)}
              className="accent-orange-600"
            />

            <RolesSelect
              name="roles"
              selected={formData.user.roles}
              onChange={(selected) => updateUserField("roles", selected)}
              label={roles_label}
              showLabel={true}
              errorMessage={errors.roles}
            />
          </div>
        )}
      </form>
    </AddEditModal>
  );
};
export default AddEditEmployeeModal;
