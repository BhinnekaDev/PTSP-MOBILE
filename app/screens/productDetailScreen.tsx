import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// OUR ICONS
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// OUR COMPONENTS
import Button from '@/components/button';
import { ProductCardInfoButton } from '@/components/productCardInfoButton';

// OUR HOOKS
import { useGetProductsByCategory } from '@/hooks/Backend/useGetProductsByCategory';
import { usePopupDetailProductAnimation } from '@/hooks/Frontend/popUpInfoCard/usePopupDetailProductAnimation';
import { useAddToCart } from '@/hooks/Backend/useAddToCart';
import { useProductSearch } from '@/hooks/Backend/useProductSearch';

// OUR INTERFACES
import { ProductType } from '@/interfaces/productDataProps';

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const compositeCategory = params.category as string;
  const informationOrService = compositeCategory
    ? compositeCategory.split('_')
    : ['', ''];
  const productType = informationOrService[0];
  const categoryForIcon = informationOrService.slice(1).join('_');

  const { products, ownerName, loading, error } =
    useGetProductsByCategory(compositeCategory);
  const { activePopupIndex, togglePopup, closePopup, fadeAnim } =
    usePopupDetailProductAnimation();
  const { loadingAddToCart, addToCart } = useAddToCart();

  // ✅ GUNAKAN useProductSearch DENGAN PRODUCTS - PASTIKAN clearSearch ADA
  const {
    searchQuery,
    filteredProducts,
    hasSearchResults,
    searchResultsCount,
    isLoading: searchLoading,
  } = useProductSearch(products, {
    enabled: !loading,
    autoClearOnUnmount: true,
  });

  // ✅ ERROR HANDLING UNTUK PARAMS
  if (!compositeCategory) {
    return (
      <View className="flex-1 items-center justify-center bg-[#A7CBE5]">
        <Text className="text-lg text-red-500">
          Error: Kategori tidak ditemukan
        </Text>
      </View>
    );
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Meteorologi':
        return <FontAwesome6 name="mountain" size={60} color="white" />;
      case 'Klimatologi':
        return <FontAwesome6 name="cloud-bolt" size={60} color="white" />;
      case 'Geofisika':
        return <FontAwesome6 name="wind" size={60} color="white" />;
      default:
        return <FontAwesome6 name="info-circle" size={60} color="white" />;
    }
  };

  // ✅ LOADING STATE UNTUK SEARCH
  const showSearchLoading = searchLoading && searchQuery.trim() !== '';

  return (
    <View className="flex-1 bg-[#A7CBE5]">
      <View className="flex-row items-center justify-center gap-4 bg-[#A7CBE5] pb-2 pt-4">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => {
            if (activePopupIndex !== null) {
              closePopup();
            }
          }}
          scrollEventThrottle={16}
        >
          {/* ✅ Tampilkan info pencarian */}
          {hasSearchResults && (
            <View className="mx-4 mb-2 self-center rounded-lg bg-blue-100 px-4 py-2">
              <Text
                style={{ fontFamily: 'LexMedium' }}
                className="text-lg text-blue-800"
              >
                {showSearchLoading
                  ? `Mencari "${searchQuery}"...`
                  : searchResultsCount > 0
                    ? `Ditemukan ${searchResultsCount} produk untuk "${searchQuery}"`
                    : `Tidak ada hasil untuk "${searchQuery}"`}
              </Text>
            </View>
          )}

          <Text
            style={{ fontFamily: 'LexBold' }}
            className="mt-4 text-center text-2xl"
          >
            {productType}
          </Text>
          <Text
            style={{ fontFamily: 'LexMedium' }}
            className="text-md mb-4 mt-1 text-center uppercase"
          >
            Stasiun {ownerName}
          </Text>

          {loading ? (
            // ✅ LOADING SKELETON
            <>
              {[...Array(3)].map((_, index) => (
                <View
                  key={index}
                  className="my-3 items-center justify-center gap-6"
                >
                  <View className="h-auto w-[74%] rounded-[15px] border-2 border-b-[4px] border-x-black/5 border-b-black/10 border-t-black/5 bg-white p-3.5">
                    <View className="h-[140px] w-full animate-pulse rounded-[20px] bg-gray-200" />
                    <View className="mt-4 h-4 w-40 animate-pulse self-center rounded bg-gray-200" />
                    <View className="mt-3 h-4 w-24 animate-pulse self-center rounded bg-gray-200" />
                    <View className="mt-5 h-10 w-56 animate-pulse self-center rounded-lg bg-gray-300" />
                  </View>
                </View>
              ))}
            </>
          ) : error ? (
            // ✅ ERROR STATE
            <View className="self-center py-4">
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-center text-lg text-red-500"
              >
                {error}
              </Text>
            </View>
          ) : filteredProducts.length > 0 ? (
            // ✅ TAMPILKAN FILTERED PRODUCTS
            filteredProducts.map((item, index) => (
              <View
                key={`${item.id}-${index}`}
                className="my-3 items-center justify-center gap-6"
              >
                <View className="h-auto w-[74%] rounded-[15px] border-2 border-b-[4px] border-x-black/5 border-b-black/10 border-t-black/5 bg-white p-3.5">
                  <ProductCardInfoButton
                    productIndex={index}
                    activePopupIndex={activePopupIndex}
                    togglePopup={togglePopup}
                    fadeAnim={fadeAnim}
                    closePopup={closePopup}
                  />
                  <View className="h-[200px] w-full shadow-xl">
                    <Image
                      source={require('@/assets/images/ProductScreen/bg-icon.png')}
                      className="h-full w-full rounded-[20px] object-cover"
                    />
                    <View className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 px-2">
                      {getCategoryIcon(categoryForIcon)}
                      <Text
                        style={{ fontFamily: 'LexMedium' }}
                        className="text-md text-center font-semibold text-white"
                      >
                        {item.Nama}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{ fontFamily: 'LexMedium' }}
                    className="py-3 text-center text-lg"
                  >
                    Rp {item.Harga.toLocaleString('id-ID')}
                  </Text>

                  <Button
                    style="bg-[#1475BA] px-4 py-2.5 rounded-lg mt-auto w-56 self-center"
                    textStyle="text-xs text-white uppercase"
                    icon={
                      <MaterialIcons
                        name="shopping-cart"
                        size={15}
                        color="white"
                      />
                    }
                    onPress={() => addToCart(item, productType as ProductType)}
                    disabled={loadingAddToCart}
                  >
                    {loadingAddToCart
                      ? 'Menambahkan...'
                      : 'Masukan Ke Keranjang'}
                  </Button>
                </View>
              </View>
            ))
          ) : (
            // ✅ EMPTY STATE - PERBAIKI LOGIC AGAR TIDAK SALAM TAMPIL
            <View className="self-center py-4">
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-center text-lg text-black"
              >
                {searchQuery && searchQuery.trim() !== ''
                  ? `Tidak ada produk "${searchQuery}" ditemukan dalam ${categoryForIcon}.`
                  : `Tidak ada produk ${categoryForIcon} ditemukan.`}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
