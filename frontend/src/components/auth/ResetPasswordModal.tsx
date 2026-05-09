import {
    useState,
} from "react";

import toast from "react-hot-toast";
import { changePassword } from "../../services/userService";

type Props = {
    open: boolean;
    onClose: () => void;
};

const ResetPasswordModal = ({
    open,
    onClose,
}: Props) => {

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] =
        useState<any>({});

    // ✅ Validation
    const validate = () => {

        const newErrors: any = {};

        if (!form.password) {
            newErrors.password =
                "Password is required";
        }

        if (
            form.password.length < 6
        ) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword =
                "Confirm password is required";
        }

        if (
            form.password !==
            form.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match";
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

            // ✅ API CALL
            await changePassword({
                password: form.password,
            });

            toast.success(
                "Password updated successfully"
            );

            // ✅ reset form
            setForm({
                password: "",
                confirmPassword: "",
            });

            // ✅ close modal
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-2xl w-[90%] max-w-xl p-8 space-y-6 shadow-2xl">

                <h2 className="text-2xl font-bold">
                    Reset Password
                </h2>

                {/* New Password */}
                <div>

                    <label className="block mb-2 font-medium">
                        New Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={form.password}
                        className="w-full border rounded-lg p-3"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password:
                                    e.target.value,
                            })
                        }
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}

                </div>

                {/* Confirm Password */}
                <div>

                    <label className="block mb-2 font-medium">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={form.confirmPassword}
                        className="w-full border rounded-lg p-3"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                confirmPassword:
                                    e.target.value,
                            })
                        }
                    />

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}

                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6">

                    <button
                        onClick={onClose}
                        className="h-12 px-6 border rounded-xl hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 transition"
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

export default ResetPasswordModal;