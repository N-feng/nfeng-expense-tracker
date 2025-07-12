import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useWallet, WalletType } from '@/contexts/wallet'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/Typo'
import { verticalScale } from '@/utils/styling'

const WalletScreen = () => {
	const { wallets, setWallet, wallet } = useWallet()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleCreateWallet = () => {
		router.push('/(modals)/createWalletModal')
	}

	const renderWalletCard = ({ item }: { item: WalletType }) => (
		<TouchableOpacity
			style={[
				styles.walletCard,
				wallet?.id === item.id && styles.selectedWallet
			]}
			onPress={() => setWallet(item)}
		>
			<View style={styles.walletHeader}>
				<View style={styles.walletIcon}>
					<Ionicons name="wallet-outline" size={24} color={colors.neutral800} />
				</View>
				<Typo fontWeight="600" size={18}>{item.name}</Typo>
			</View>

			<View style={styles.walletBalance}>
				<Typo fontWeight="500" color={colors.neutral600} size={14}>Balance</Typo>
				<Typo fontWeight="700" size={24}>${item.amount?.toFixed(2) || '0.00'}</Typo>
			</View>

			<View style={styles.walletStats}>
				<View style={styles.statItem}>
					<Typo color={colors.green} fontWeight="600" size={16}>
						+${item.totalIncome?.toFixed(2) || '0.00'}
					</Typo>
					<Typo color={colors.neutral600} size={12}>Income</Typo>
				</View>
				<View style={styles.statItem}>
					<Typo color={colors.rose} fontWeight="600" size={16}>
						-${item.totalExpenses?.toFixed(2) || '0.00'}
					</Typo>
					<Typo color={colors.neutral600} size={12}>Expense</Typo>
				</View>
			</View>
		</TouchableOpacity>
	)

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<View style={styles.header}>
					<Typo fontWeight="700" size={24}>My Wallets</Typo>
					<TouchableOpacity
						style={styles.addButton}
						onPress={handleCreateWallet}
					>
						<Ionicons name="add" size={24} color={colors.white} />
					</TouchableOpacity>
				</View>

				{wallets.length === 0 ? (
					<View style={styles.emptyContainer}>
						<Ionicons name="wallet-outline" size={60} color={colors.neutral500} />
						<Typo color={colors.neutral600} size={18} style={styles.emptyText}>
							No wallets found
						</Typo>
						<TouchableOpacity
							style={styles.createWalletButton}
							onPress={handleCreateWallet}
						>
							<Typo color={colors.white} fontWeight="600">
								Create a Wallet
							</Typo>
						</TouchableOpacity>
					</View>
				) : (
					<FlatList
						data={wallets}
						renderItem={renderWalletCard}
						keyExtractor={(item) => item.id || ''}
						contentContainerStyle={styles.listContainer}
					/>
				)}
			</View>
		</ScreenWrapper>
	)
}

export default WalletScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacingX._20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: spacingY._20,
	},
	addButton: {
		backgroundColor: colors.primary,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		marginVertical: spacingY._15,
	},
	createWalletButton: {
		backgroundColor: colors.primary,
		paddingVertical: spacingY._12,
		paddingHorizontal: spacingX._20,
		borderRadius: 10,
		marginTop: spacingY._10,
	},
	listContainer: {
		paddingBottom: 100, // For TabBar
	},
	walletCard: {
		backgroundColor: colors.text,
		borderRadius: 16,
		padding: spacingY._15,
		marginBottom: spacingY._15,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	selectedWallet: {
		borderWidth: 2,
		borderColor: colors.primary,
	},
	walletHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: spacingY._10,
	},
	walletIcon: {
		backgroundColor: colors.neutral200,
		borderRadius: 8,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: spacingX._10,
	},
	walletBalance: {
		marginBottom: spacingY._15,
	},
	walletStats: {
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: colors.neutral200,
		paddingTop: spacingY._10,
	},
	statItem: {
		flex: 1,
		alignItems: 'center',
	},
})