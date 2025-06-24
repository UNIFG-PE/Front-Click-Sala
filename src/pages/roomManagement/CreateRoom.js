import React, { useState, useEffect } from 'react';
import './CreateRoom.css';

const defaultImage = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';

function CreateRoom({
  onSubmit,
  onCancel,
  existingRooms = [],
  roomTypes = [],
  campuses = [],
  initialData = null,
  isEdit = false,
}) {
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [features, setFeatures] = useState('');
  const [image, setImage] = useState('');
  const [available, setAvailable] = useState(true);
  const [roomTypeId, setRoomTypeId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.identifier || '');
      setCampus(initialData.campusName || '');
      setDescription(initialData.description || '');
      setCapacity(initialData.capacity || '');
      setFeatures(initialData.features?.join(', ') || '');
      setImage(initialData.imageUrl || '');
      setAvailable(initialData.available ?? true);
      setRoomTypeId(initialData.categoryId || initialData.roomTypeId || '');
    }
  }, [initialData]);

  const unavailableLocations = [
    'Bloco Z, 10º andar',
    'Bloco X, Subsolo'
  ];

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!roomTypeId) {
      setError('Selecione o tipo de sala.');
      return;
    }

   
    if (
      existingRooms.some(
        room =>
          room.identifier &&
          room.identifier.toLowerCase() === name.trim().toLowerCase() &&
          (!isEdit || room.id !== initialData?.id)
      )
    ) {
      setError('Já existe uma sala com esse nome.');
      return;
    }

    if (image && !validateUrl(image)) {
      setError('URL da imagem inválida. Use um endereço iniciado por http:// ou https://');
      return;
    }

    if (unavailableLocations.some(loc => loc.toLowerCase() === campus.trim().toLowerCase())) {
      setError('Este campus está indisponível. Escolha outro.');
      return;
    }

    const selectedCampus = campuses.find(c => c.name === campus);
    if (!selectedCampus) {
      setError('Campus inválido. Por favor, selecione um campus válido.');
      return;
    }

    const featuresArray = features
      .split(/,|\n/)
      .map(f => f.trim())
      .filter(f => f);

    const result = await onSubmit({
      identifier: name.trim(),
      floor: 0,
      capacity: Number(capacity),
      description,
      status: available ? "AVAILABLE" : "UNAVAILABLE",
      campusId: selectedCampus.id,
      categoryId: Number(roomTypeId),
      imageUrl: image || defaultImage
    });

    if (!result) {
      setError("Erro ao criar sala.");
      return;
    }

    setName('');
    setCampus('');
    setDescription('');
    setCapacity('');
    setFeatures('');
    setImage('');
    setAvailable(true);
    setRoomTypeId('');
    setError('');
  };

  return (
    <div className="create-room-modal">
      <form className="create-room-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? 'Editar Sala' : 'Criar Nova Sala'}</h2>
        {error && <div className="form-error" role="alert">{error}</div>}
        <label>Nome da sala*</label>
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Tipo de sala*</label>
        <select
          className='room-type-select'
          required
          value={roomTypeId}
          onChange={e => setRoomTypeId(e.target.value)}
        >
          <option value="">Selecione o tipo de sala</option>
          {roomTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>

        <label>Campus*</label>
        <select
          className='room-type-select'
          required
          value={campus}
          onChange={e => setCampus(e.target.value)}
        >
          <option value="">Selecione um campus</option>
          {campuses.map(campus => (
            <option key={campus.id} value={campus.name}>
              {campus.name}
            </option>
          ))}
        </select>

        <label>Descrição</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />

        <label>Capacidade*</label>
        <input
          type="number"
          required
          min={1}
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
        />

        <label>Recursos</label>
        <textarea
          value={features}
          onChange={e => setFeatures(e.target.value)}
          rows={2}
          placeholder="Projetor, Ar-condicionado, TV..."
        />

        <label>URL da Imagem</label>
        <input
          type="url"
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="https://..."
        />

        <label>
          <input
            type="checkbox"
            checked={available}
            onChange={e => setAvailable(e.target.checked)}
          />
          Disponível para reserva
        </label>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="submit-btn">{isEdit ? 'Salvar Alterações' : 'Criar Sala'}</button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;