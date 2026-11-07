import React, { useState } from 'react';
import { CartItem } from './MenuSection';
import { X, Trash2, ShoppingBag, Send, MapPin, Copy, Check } from 'lucide-react';

interface TakeawayBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, newQty: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const TakeawayBagModal: React.FC<TakeawayBagModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [pickupNote, setPickupNote] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Formatted order text for WhatsApp or SMS
  const generateOrderText = () => {
    let text = `*GRANNY'S KITCHEN TAKEAWAY ORDER*\n`;
    text += `📍 Fourways Mall BTC05 Taxi Terminal\n`;
    if (customerName.trim()) {
      text += `👤 Customer: ${customerName}\n`;
    }
    text += `--------------------------------\n`;

    cart.forEach((c) => {
      text += `• ${c.quantity}x ${c.item.name} - R${c.totalPrice.toFixed(2)}\n`;
      if (c.selectedStarch) {
        text += `   Starch: ${c.selectedStarch}\n`;
      }
      if (c.selectedVeg && c.selectedVeg.length > 0) {
        text += `   Veggies: ${c.selectedVeg.join(' & ')}\n`;
      }
      if (c.selectedExtras && c.selectedExtras.length > 0) {
        text += `   Extras: ${c.selectedExtras.map((e) => e.name).join(', ')}\n`;
      }
    });

    text += `--------------------------------\n`;
    text += `*TOTAL: R${totalAmount.toFixed(2)}*\n`;
    if (pickupNote.trim()) {
      text += `Note: ${pickupNote}\n`;
    }
    text += `Payment: Cash / Card on Pickup at BTC05\nThank you!`;
    return text;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateOrderText());
    // Direct WhatsApp send link
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(generateOrderText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#fffdf9] border-2 border-[#8b1d20]/50 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header with Scottish Tartan check banner */}
        <div className="bg-scottish-tartan p-2.5 sm:p-3 flex items-center justify-between relative border-b-2 border-[#8b1d20]/40 shadow-xs">
          <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
            <ShoppingBag className="w-5 h-5 text-[#e5a84b]" />
            <div>
              <h3 className="font-condensed text-base sm:text-lg uppercase tracking-wider font-extrabold text-[#fffcf7]">
                Your Takeaway Bag
              </h3>
              <p className="text-[10px] text-[#e8c89b] font-body">
                Granny's Kitchen • Fourways Mall BTC05
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2d1b16] hover:bg-[#452b23] border border-[#e5a84b]/40 flex items-center justify-center text-white cursor-pointer shadow-sm transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="p-4 sm:p-6 overflow-y-auto grow space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-[#6e5143]">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#cbbaa8] mb-3" />
              <p className="font-editorial text-lg font-bold">Your bag is empty</p>
              <p className="text-xs text-[#8c6d5d] mt-1">
                Explore the menu to add delicious beef stew, chicken dust, kotas, and magwinya!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="bg-[#fcf8f0] border border-[#e5d4be] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-start gap-3 grow">
                    {cartItem.item.image && (
                      <div className="w-12 h-12 rounded-full shrink-0 border border-[#d5c2ab] bg-white p-0.5 shadow-2xs">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-[#3d1a1b]">
                          {cartItem.item.name}
                        </h4>
                      </div>

                      {cartItem.selectedStarch && (
                        <p className="text-xs text-[#734e3e] mt-0.5">
                          <span className="font-semibold text-[#8b1d20]">Starch:</span>{' '}
                          {cartItem.selectedStarch}
                        </p>
                      )}

                      {cartItem.selectedVeg && cartItem.selectedVeg.length > 0 && (
                        <p className="text-xs text-[#734e3e]">
                          <span className="font-semibold text-[#8b1d20]">Veggies:</span>{' '}
                          {cartItem.selectedVeg.join(', ')}
                        </p>
                      )}

                      {cartItem.selectedExtras && cartItem.selectedExtras.length > 0 && (
                        <p className="text-xs text-[#734e3e]">
                          <span className="font-semibold text-[#8b1d20]">Extras:</span>{' '}
                          {cartItem.selectedExtras.map((e) => e.name).join(', ')}
                        </p>
                      )}

                      <div className="font-mono text-sm font-bold text-[#8b1d20] mt-1 sm:hidden">
                        R{cartItem.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-white border border-[#dac8b4] rounded-lg px-2 py-1">
                      <button
                        onClick={() =>
                          onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)
                        }
                        className="w-5 h-5 flex items-center justify-center font-bold text-[#8b1d20] hover:bg-[#faebd7] rounded cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-xs w-4 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)
                        }
                        className="w-5 h-5 flex items-center justify-center font-bold text-[#8b1d20] hover:bg-[#faebd7] rounded cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-mono text-sm font-bold text-[#8b1d20] hidden sm:block w-20 text-right">
                      R{cartItem.totalPrice.toFixed(2)}
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.cartId)}
                      className="text-[#9e6f6f] hover:text-[#7a1c1d] p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Customer Name & Notes for order */}
              <div className="bg-[#f9f2e7] border border-[#dfceb9] rounded-xl p-3.5 space-y-2.5 mt-4">
                <div className="text-xs font-bold text-[#520d0f] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8b1d20]" />
                  <span>Pickup Details (BTC05 Taxi Terminal)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name (for order calling)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-[#cbbaa4] rounded-lg text-[#3d241c] focus:outline-none focus:ring-1 focus:ring-[#8b1d20]"
                  />
                  <input
                    type="text"
                    placeholder="Pickup Time / Extra napkin, etc."
                    value={pickupNote}
                    onChange={(e) => setPickupNote(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-[#cbbaa4] rounded-lg text-[#3d241c] focus:outline-none focus:ring-1 focus:ring-[#8b1d20]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Total and Actions */}
        {cart.length > 0 && (
          <div className="bg-[#f7eedf] p-4 sm:p-5 border-t-2 border-[#decbb5] space-y-3">
            <div className="flex items-center justify-between text-base sm:text-lg">
              <span className="font-bold text-[#520d0f] uppercase tracking-wide">
                Total Estimate:
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-[#8b1d20] tabular-nums">
                R{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-condensed tracking-wider text-base uppercase font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send WhatsApp Order</span>
              </button>

              <button
                onClick={handleCopyOrder}
                className="w-full py-3 px-4 rounded-xl bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 font-condensed tracking-wider text-base uppercase font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#e5a84b]" /> : <Copy className="w-4 h-4 text-[#e5a84b]" />}
                <span>{copied ? 'Order Copied!' : 'Copy Order Text'}</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={onClearCart}
                className="text-[11px] text-[#916b5a] hover:underline cursor-pointer"
              >
                Empty Entire Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
