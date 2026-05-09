import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { updateUser } from "../../services/userService";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: any;
};

const EditUserModal = ({
  open,
  onClose,
  onSuccess,
  user,
}: Props) => {

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState<any>({});

  const [form, setForm] = useState({
    name: "",
    role: 2,
    status: 1,
    password: "",
  });

  // ✅ Set form when user changes
  useEffect(() => {

    if (user) {
      setForm({
        name: user.name || "",
        role: user.role || 2,
        status: user.status || 1,
        password: "",
      });
    }

  }, [user]);

  // ✅ Validation
  const validate = () => {

    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    if (
      form.password &&
      form.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ✅ Submit
  const handleSubmit = async () => {

    if (!validate()) return;

    try {

      setLoading(true);

      await updateUser(
        user._id,
        form
      );

      toast.success(
        "User updated successfully"
      );

      onSuccess();

      onClose();

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-5">

        <h2 className="text-2xl font-bold">
          Edit User
        </h2>

        {/* Name */}
        <div>

          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            value={form.name}
            placeholder="Enter name"
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}

        </div>

        {/* Role */}
        <div>

          <label className="block mb-2 font-medium">
            Role
          </label>

          <select
            value={form.role}
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({
                ...form,
                role: Number(e.target.value),
              })
            }
          >

            <option value={1}>
              Admin
            </option>

            <option value={2}>
              Sub User
            </option>

          </select>

        </div>

        {/* Status */}
        <div>

          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={form.status}
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({
                ...form,
                status: Number(e.target.value),
              })
            }
          >

            <option value={1}>
              Active
            </option>

            <option value={2}>
              Inactive
            </option>

          </select>

        </div>

        {/* Password */}
        <div>

          <label className="block mb-2 font-medium">
            New Password
          </label>

          <input
            type="password"
            placeholder="Leave blank if no change"
            value={form.password}
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditUserModal;