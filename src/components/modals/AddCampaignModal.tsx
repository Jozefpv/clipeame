import React, { useState, ChangeEvent } from 'react';
import { DashboardGateway } from '../../gateways/dashboard.gateway';

import { Campaign } from '../../models/CampingModel';
import { Spinner } from '../Spinner';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newCampaign: Campaign) => void;
}

interface CampaignForm {
  title: string;
  description: string;
  budget: number | '';
  reward: number | '';
  typeId: number | '';
  socialMediaId: number | '';
  categoryId: number | '';
  startDate: string;
  endDate: string;
  imageFile: File | null;
}

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
}) => {
  const gateway = new DashboardGateway();

  const [form, setForm] = useState<CampaignForm>({
    title: '',
    description: '',
    budget: '',
    reward: '',
    typeId: '',
    socialMediaId: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] ?? null;
      setForm(prev => ({ ...prev, imageFile: file }));
    } else if (type === 'number') {
      setForm(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: name.endsWith('Id') ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    const {
      title,
      description,
      budget,
      reward,
      typeId,
      socialMediaId,
      categoryId,
      startDate,
      endDate,
      imageFile,
    } = form;

    if (
      !title.trim() ||
      !description.trim() ||
      !budget ||
      !reward ||
      !typeId ||
      !socialMediaId ||
      !categoryId ||
      !startDate ||
      !endDate ||
      !imageFile
    ) {
      setError(
        'Rellena todos los campos obligatorios, incluyendo imagen y selectores.',
      );
      return;
    }

    setLoading(true);
    try {
      const body = new FormData();
      body.append('title', title);
      body.append('description', description);
      body.append('budget', budget.toString());
      body.append('reward', reward.toString());
      body.append('typeId', typeId.toString());
      body.append('socialMediaId', socialMediaId.toString());
      body.append('categoryId', categoryId.toString());
      body.append('startDate', startDate);
      body.append('endDate', endDate);
      body.append('image', imageFile);
      body.append('paid', '0');
      body.append('requirements', '[]');
      body.append('files', '[]');
      body.append('status', '0');
      body.append('creationDate', new Date().toISOString());

      const checkoutUrl = await gateway.addCampaign(body);
      window.location.href = checkoutUrl;

      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error creando campaña');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-xl w-full max-w-2xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        <header className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Crear campaña</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={onClose}
            disabled={loading}
          >
            ✕
          </button>
        </header>

        <div className="px-6 py-4 space-y-4 text-white text-sm">
          {error && <p className="text-red-400">{error}</p>}

          {/* Inputs de texto */}
          <div className="space-y-1">
            <label className="block text-white/80">Título*</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-white/80">Descripción*</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          {/* Selectores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-white/80">Tipo*</label>
              <select
                name="typeId"
                value={form.typeId}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option value="">Selecciona...</option>
                <option value="1">Clip</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-white/80">Red social*</label>
              <select
                name="socialMediaId"
                value={form.socialMediaId}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option value="">Selecciona...</option>
                <option value="1">TikTok</option>
                <option value="2">Instagram</option>
                <option value="3">YouTube</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-white/80">Categoría*</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option value="">Selecciona...</option>
                <option value="1">Creador</option>
              </select>
            </div>
          </div>

          {/* Fecha y presupuesto */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-white/80">Presupuesto (€)*</label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-white/80">
                Recompensa (€ por 1K visitas)*
              </label>
              <input
                type="number"
                name="reward"
                value={form.reward}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-white/80">Inicio*</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-white/80">Fin*</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Portada */}
          <div className="space-y-1">
            <label className="block text-white/80">Portada (imagen)*</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              disabled={loading}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        <footer className="px-6 py-4 border-t border-gray-700 text-right">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full mr-2 disabled:opacity-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-400 text-white font-semibold px-6 py-2 rounded-full transition cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="flex">
                  {'Creando…'}
                  <Spinner className="ml-2" />
                </div>
              </>
            ) : (
              'Crear campaña'
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};
