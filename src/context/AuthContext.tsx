import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Address, Order } from '../types';
import { useAdmin } from './AdminContext';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  userOrders: Order[];
}

const defaultUser: UserProfile = {
  id: 'usr-1',
  name: 'عبدالرحمن الدوسري',
  email: 'a.aldosari@example.kw',
  phone: '+965 9988 7766',
  addresses: [
    {
      id: 'addr-1',
      name: 'عبدالرحمن الدوسري',
      phone: '+965 9988 7766',
      governorate: 'العاصمة',
      area: 'الضاحية (عبدالله السالم)',
      block: '3',
      street: 'شارع صنعاء',
      avenue: 'جادة 12',
      house: 'منزل 14',
      notes: 'التوصيل بعد صلاة العصر رجاءً',
      isDefault: true,
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { orders } = useAdmin();
  const { showToast } = useToast();

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nubl_user');
    return saved ? JSON.parse(saved) : defaultUser; // Start with pre-filled mock luxury customer for seamless review
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('nubl_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nubl_user');
    }
  }, [user]);

  const login = (email: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email,
      phone: '+965 9900 0000',
      addresses: [],
    };
    setUser(newUser);
    showToast('أهلاً بك مجدداً في دار نُبْل', 'success');
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      addresses: [],
    };
    setUser(newUser);
    showToast('تم إنشاء حسابك بنجاح، مرحباً بك في نُبْل', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('تم تسجيل الخروج بنجاح', 'info');
  };

  const updateProfile = (name: string, phone: string) => {
    if (!user) return;
    setUser({ ...user, name, phone });
    showToast('تم تحديث البيانات الشخصية بنجاح', 'success');
  };

  const addAddress = (addrData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...addrData,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0 ? true : !!addrData.isDefault,
    };

    let updatedAddresses = [...user.addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    setUser({ ...user, addresses: updatedAddresses });
    showToast('تمت إضافة العنوان بنجاح', 'success');
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.filter((a) => a.id !== id);
    setUser({ ...user, addresses: updated });
    showToast('تم حذف العنوان', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setUser({ ...user, addresses: updated });
    showToast('تم تعيين العنوان كافتراضي', 'success');
  };

  // Find user's orders by matching email or phone
  const userOrders = orders.filter(
    (o) =>
      user &&
      (o.customer.email.toLowerCase() === user.email.toLowerCase() ||
        o.customer.phone === user.phone)
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        userOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
